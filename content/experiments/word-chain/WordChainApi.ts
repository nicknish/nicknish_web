export interface ValidateResponse {
	valid: boolean;
	reason: string;
}

const RETRY_REASON = "Couldn't validate — try again";

export async function validateWordAssociation(
	currentWord: string,
	guess: string,
	turnstileToken: string,
): Promise<ValidateResponse> {
	try {
		const response = await fetch("/api/lab/word-chain", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ currentWord, guess, turnstileToken }),
		});

		// 502 = AI service unavailable, let player retry
		if (response.status === 502) {
			return { valid: false, reason: RETRY_REASON };
		}

		// Other non-200 (400 = bad input, 403 = verification failed, etc.)
		if (!response.ok) {
			const data = (await response.json().catch(() => null)) as ValidateResponse | null;
			return data ?? { valid: false, reason: RETRY_REASON };
		}

		return response.json() as Promise<ValidateResponse>;
	} catch {
		return { valid: false, reason: RETRY_REASON };
	}
}
