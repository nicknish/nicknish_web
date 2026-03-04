export interface ValidateResponse {
	valid: boolean;
	reason: string;
}

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

		if (!response.ok) {
			return { valid: false, reason: "Couldn't validate — try again" };
		}

		return response.json() as Promise<ValidateResponse>;
	} catch {
		return { valid: false, reason: "Couldn't validate — try again" };
	}
}
