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

interface OpenRouterMessage {
	role: string;
	content: string;
}

interface OpenRouterChoice {
	message: OpenRouterMessage;
}

interface OpenRouterResponse {
	choices: OpenRouterChoice[];
}

interface LLMJudgement {
	valid: boolean;
	reason: string;
}

async function verifyTurnstile(token: string): Promise<boolean> {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) return false;

	const body = new URLSearchParams({ secret, response: token });
	const res = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			method: "POST",
			body,
		},
	);

	const data = (await res.json()) as TurnstileVerifyResponse;
	return data.success === true;
}

async function judgeAssociation(
	currentWord: string,
	guess: string,
): Promise<LLMJudgement> {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) {
		return { valid: false, reason: "Couldn't validate — try again" };
	}

	const systemPrompt =
		'You are a word association judge. Given two words, determine if the second word is meaningfully related to the first through association, category, semantic similarity, or common cultural connection. Be generous but not absurd — "knight" → "castle" is valid, "knight" → "refrigerator" is not. Respond ONLY with valid JSON: {"valid": boolean, "reason": "brief explanation"}';

	const userPrompt = `Current word: "${currentWord}". Guess: "${guess}".`;

	const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "z-ai/glm-4.5-air:free",
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userPrompt },
			],
			temperature: 0.1,
			max_tokens: 100,
		}),
		signal: AbortSignal.timeout(10_000),
	});

	if (!res.ok) {
		return { valid: false, reason: "Couldn't validate — try again" };
	}

	const data = (await res.json()) as OpenRouterResponse;
	const content = data.choices[0]?.message?.content ?? "";

	// Extract JSON from response (model might wrap it in markdown code blocks)
	const match = content.match(/\{[\s\S]*?\}/);
	if (!match) {
		return { valid: false, reason: "Couldn't validate — try again" };
	}

	try {
		const parsed = JSON.parse(match[0]) as Partial<LLMJudgement>;
		if (
			typeof parsed.valid !== "boolean" ||
			typeof parsed.reason !== "string"
		) {
			return { valid: false, reason: "Couldn't validate — try again" };
		}
		return { valid: parsed.valid, reason: parsed.reason };
	} catch {
		return { valid: false, reason: "Couldn't validate — try again" };
	}
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

	// Verify Turnstile
	try {
		const turnstileOk = await verifyTurnstile(turnstileToken);
		if (!turnstileOk) {
			return NextResponse.json(
				{
					valid: false,
					reason: "Verification failed. Please refresh and try again.",
				},
				{ status: 403 },
			);
		}
	} catch {
		return NextResponse.json({
			valid: false,
			reason: "Couldn't validate — try again",
		});
	}

	// Judge via OpenRouter
	try {
		const result = await judgeAssociation(
			currentWord.trim().toLowerCase(),
			trimmedGuess,
		);
		return NextResponse.json(result);
	} catch {
		return NextResponse.json({
			valid: false,
			reason: "Couldn't validate — try again",
		});
	}
}
