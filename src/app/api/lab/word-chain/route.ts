import { type NextRequest, NextResponse } from "next/server";

interface ValidateRequest {
	currentWord: string;
	guess: string;
	turnstileToken: string;
}

interface ValidateResponse {
	valid: boolean;
	reason: string;
}

interface TurnstileVerifyResponse {
	success: boolean;
	"error-codes"?: string[];
}

interface LLMJudgement {
	valid: boolean;
	reason: string;
}

const COULD_NOT_VALIDATE = "Couldn't validate — try again";

// Models to try in order. Free-tier reasoning models are unreliable, so we
// rotate through several to increase the odds of getting a non-empty content.
const MODELS = [
	"z-ai/glm-4.5-air:free",
	"mistralai/mistral-small-3.1-24b-instruct:free",
	"arcee-ai/trinity-mini:free",
];

async function verifyTurnstile(token: string): Promise<boolean> {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) return false;

	const body = new URLSearchParams({ secret, response: token });
	const res = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{ method: "POST", body },
	);

	const data = (await res.json()) as TurnstileVerifyResponse;
	return data.success === true;
}

/**
 * Extract a JSON object like {"valid": true, "reason": "..."} from a string.
 * Returns null if not found or unparseable.
 */
function extractJudgement(text: string): LLMJudgement | null {
	const match = text.match(/\{[\s\S]*?\}/);
	if (!match) return null;

	try {
		const parsed = JSON.parse(match[0]) as Partial<LLMJudgement>;
		if (
			typeof parsed.valid !== "boolean" ||
			typeof parsed.reason !== "string"
		) {
			return null;
		}
		return { valid: parsed.valid, reason: parsed.reason };
	} catch {
		return null;
	}
}

async function callModel(
	apiKey: string,
	model: string,
	systemPrompt: string,
	userPrompt: string,
): Promise<LLMJudgement | null> {
	console.log(`[word-chain] trying model: ${model}`);

	const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userPrompt },
			],
			temperature: 0.1,
			max_tokens: 1000,
		}),
		signal: AbortSignal.timeout(20_000),
	});

	if (!res.ok) {
		const errBody = await res.text().catch(() => "(unreadable)");
		console.error(`[word-chain] ${model} HTTP ${res.status}: ${errBody}`);
		return null;
	}

	// biome-ignore lint/suspicious/noExplicitAny: OpenRouter response shape varies
	const data = (await res.json()) as any;
	const message = data?.choices?.[0]?.message;
	if (!message) {
		console.error(`[word-chain] ${model} no message in response:`, JSON.stringify(data).slice(0, 300));
		return null;
	}

	// Try content first, then fall back to reasoning field.
	// Many free-tier models are reasoning models that put chain-of-thought
	// in a "reasoning" field and may return content: null if all tokens
	// were spent on reasoning.
	const content = message.content ?? "";
	const reasoning = message.reasoning ?? "";

	const fromContent = extractJudgement(content);
	if (fromContent) {
		console.log(`[word-chain] ${model} OK (from content): valid=${fromContent.valid}`);
		return fromContent;
	}

	const fromReasoning = extractJudgement(reasoning);
	if (fromReasoning) {
		console.log(`[word-chain] ${model} OK (from reasoning): valid=${fromReasoning.valid}`);
		return fromReasoning;
	}

	console.error(`[word-chain] ${model} no JSON found. content=${JSON.stringify(content).slice(0, 200)} reasoning=${JSON.stringify(reasoning).slice(0, 200)}`);
	return null;
}

async function judgeAssociation(
	currentWord: string,
	guess: string,
): Promise<LLMJudgement> {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		console.error("[word-chain] OPENROUTER_API_KEY is not set");
		return { valid: false, reason: COULD_NOT_VALIDATE };
	}

	const systemPrompt = `You are a word association judge. Given two words, determine if the second word is meaningfully related to the first through association, category, semantic similarity, or common cultural connection. Be generous but not absurd — "knight" → "castle" is valid, "knight" → "refrigerator" is not. Respond ONLY with valid JSON: {"valid": boolean, "reason": "brief explanation"}. Do NOT think step-by-step. Output the JSON immediately.`;

	const userPrompt = `Current word: "${currentWord}". Guess: "${guess}".`;

	// Try each model until one returns a valid judgement
	for (const model of MODELS) {
		try {
			const result = await callModel(apiKey, model, systemPrompt, userPrompt);
			if (result) return result;
		} catch (e) {
			console.error(`[word-chain] ${model} threw:`, e instanceof Error ? e.message : e);
		}
	}

	console.error(`[word-chain] all ${MODELS.length} models failed for "${currentWord}" → "${guess}"`);
	return { valid: false, reason: COULD_NOT_VALIDATE };
}

export async function POST(
	request: NextRequest,
): Promise<NextResponse<ValidateResponse>> {
	let body: ValidateRequest;

	try {
		body = (await request.json()) as ValidateRequest;
	} catch {
		return NextResponse.json(
			{ valid: false, reason: "Invalid request" },
			{ status: 400 },
		);
	}

	const { currentWord, guess, turnstileToken } = body;

	// Basic input validation
	if (
		typeof currentWord !== "string" ||
		typeof guess !== "string" ||
		typeof turnstileToken !== "string"
	) {
		return NextResponse.json(
			{ valid: false, reason: "Invalid request" },
			{ status: 400 },
		);
	}

	const trimmedGuess = guess.trim().toLowerCase();

	if (!trimmedGuess || !/^[a-z]+$/.test(trimmedGuess)) {
		return NextResponse.json(
			{ valid: false, reason: "Single alphabetic words only." },
			{ status: 400 },
		);
	}

	// Verify Turnstile (optional — tokens are single-use, so only the first
	// call after a fresh token will pass. Subsequent calls in the same game
	// session send a stale token which is expected to fail; we allow those
	// through so gameplay isn't interrupted.)
	if (turnstileToken) {
		try {
			await verifyTurnstile(turnstileToken);
		} catch {
			// Turnstile service hiccup — don't block gameplay
		}
	}

	// Judge via OpenRouter (tries multiple models)
	try {
		const result = await judgeAssociation(
			currentWord.trim().toLowerCase(),
			trimmedGuess,
		);
		if (result.reason === COULD_NOT_VALIDATE) {
			return NextResponse.json(result, { status: 502 });
		}
		return NextResponse.json(result);
	} catch (e) {
		console.error("[word-chain] unhandled error:", e instanceof Error ? e.message : e);
		return NextResponse.json(
			{ valid: false, reason: COULD_NOT_VALIDATE },
			{ status: 502 },
		);
	}
}
