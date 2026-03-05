"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { validateWordAssociation } from "./WordChainApi";
import { WORD_LIST } from "./wordList";

type GamePhase = "turnstile" | "playing" | "gameOver";

interface TurnstileOptions {
	sitekey: string;
	callback: (token: string) => void;
	"error-callback"?: () => void;
	"expired-callback"?: () => void;
	theme?: "dark" | "light" | "auto";
}

declare global {
	interface Window {
		turnstile?: {
			render: (container: HTMLElement, options: TurnstileOptions) => string;
			reset: (widgetId: string) => void;
			remove: (widgetId: string) => void;
		};
	}
}

const HIGH_SCORE_KEY = "word-chain-highscore";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const PILL_GRADIENTS = [
	"linear-gradient(135deg, #7c3aed, #4f46e5)",
	"linear-gradient(135deg, #2563eb, #0891b2)",
	"linear-gradient(135deg, #be185d, #e11d48)",
	"linear-gradient(135deg, #b45309, #059669)",
];

function pickRandomWord(): string {
	return (
		WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)] ?? WORD_LIST[0]
	);
}

export function WordChain() {
	const [phase, setPhase] = useState<GamePhase>("turnstile");
	const [chain, setChain] = useState<string[]>([]);
	const [currentWord, setCurrentWord] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [validating, setValidating] = useState(false);
	const [shaking, setShaking] = useState(false);
	const [reason, setReason] = useState("");
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [newWord, setNewWord] = useState<string | null>(null);
	const [replayIndex, setReplayIndex] = useState(-1);
	const [finalChain, setFinalChain] = useState<string[]>([]);
	const [finalScore, setFinalScore] = useState(0);
	const [finalReason, setFinalReason] = useState("");

	const turnstileContainerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);
	const chainScrollRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Load high score
	useEffect(() => {
		try {
			const saved = localStorage.getItem(HIGH_SCORE_KEY);
			if (saved) setHighScore(parseInt(saved, 10));
		} catch {}
	}, []);

	// Load Turnstile script
	useEffect(() => {
		if (document.getElementById("turnstile-script")) return;
		const script = document.createElement("script");
		script.id = "turnstile-script";
		script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	}, []);

	// Render Turnstile widget
	useEffect(() => {
		if (!turnstileContainerRef.current) return;

		const render = () => {
			if (!window.turnstile || !turnstileContainerRef.current) return;
			if (widgetIdRef.current !== null) return;

			widgetIdRef.current = window.turnstile.render(
				turnstileContainerRef.current,
				{
					sitekey: SITE_KEY,
					callback: (token: string) => setTurnstileToken(token),
					"expired-callback": () => setTurnstileToken(null),
					"error-callback": () => setTurnstileToken(null),
					theme: "dark",
				},
			);
		};

		if (window.turnstile) {
			render();
			return;
		}

		const interval = setInterval(() => {
			if (window.turnstile) {
				clearInterval(interval);
				render();
			}
		}, 100);

		return () => clearInterval(interval);
	}, []);

	// Auto-scroll chain to end when it grows
	// biome-ignore lint/correctness/useExhaustiveDependencies: chain.length is the intended trigger
	useEffect(() => {
		if (chainScrollRef.current) {
			chainScrollRef.current.scrollLeft = chainScrollRef.current.scrollWidth;
		}
	}, [chain.length]);

	// Game over: chain replay animation
	useEffect(() => {
		if (phase !== "gameOver") return;
		setReplayIndex(-1);
		let i = 0;
		const interval = setInterval(() => {
			setReplayIndex(i);
			i++;
			if (i >= finalChain.length) clearInterval(interval);
		}, 300);
		return () => clearInterval(interval);
	}, [phase, finalChain.length]);

	const startGame = useCallback(() => {
		const seed = pickRandomWord();
		setChain([seed]);
		setCurrentWord(seed);
		setInputValue("");
		setReason("");
		setScore(0);
		setNewWord(null);
		setFinalChain([]);
		setFinalReason("");
		setPhase("playing");
		setTimeout(() => inputRef.current?.focus(), 100);
	}, []);

	const triggerShake = useCallback(() => {
		setShaking(true);
		setTimeout(() => setShaking(false), 600);
	}, []);

	const handleSubmit = useCallback(async () => {
		if (!turnstileToken || validating) return;

		const guess = inputValue.trim().toLowerCase();

		if (!guess) return;

		if (!/^[a-z]+$/.test(guess)) {
			setReason("Letters only, please.");
			triggerShake();
			return;
		}

		if (chain.map((w) => w.toLowerCase()).includes(guess)) {
			setReason(`"${guess}" is already in your chain.`);
			triggerShake();
			return;
		}

		setValidating(true);
		setReason("");

		try {
			const result = await validateWordAssociation(
				currentWord,
				guess,
				turnstileToken,
			);

			// If the API couldn't reach the LLM, let the player retry
			// instead of ending the game.
			if (
				!result.valid &&
				result.reason === "Couldn't validate — try again"
			) {
				setReason("Couldn't validate — try again");
				triggerShake();
				return;
			}

			if (result.valid) {
				const newChain = [...chain, guess];
				const newScore = newChain.length - 1;
				setChain(newChain);
				setCurrentWord(guess);
				setInputValue("");
				setScore(newScore);
				setNewWord(guess);
				setTimeout(() => setNewWord(null), 400);

				try {
					const saved = parseInt(
						localStorage.getItem(HIGH_SCORE_KEY) ?? "0",
						10,
					);
					if (newScore > saved) {
						localStorage.setItem(HIGH_SCORE_KEY, String(newScore));
						setHighScore(newScore);
					}
				} catch {}
			} else {
				setReason(result.reason);
				triggerShake();
				setTimeout(() => {
					setFinalChain([...chain]);
					setFinalScore(score);
					setFinalReason(result.reason);
					setPhase("gameOver");
				}, 800);
			}
		} catch {
			setReason("Couldn't validate — try again");
			triggerShake();
		} finally {
			setValidating(false);
		}
	}, [
		turnstileToken,
		validating,
		inputValue,
		chain,
		currentWord,
		score,
		triggerShake,
	]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				void handleSubmit();
			}
		},
		[handleSubmit],
	);

	const handlePlayAgain = useCallback(() => {
		startGame();
	}, [startGame]);

	return (
		<div className="not-prose my-8">
			<style>{`
        @keyframes wcSlideIn {
          from { opacity: 0; transform: translateX(16px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes wcShake {
          0%, 100% { transform: translateX(0); }
          15%  { transform: translateX(-8px); }
          30%  { transform: translateX(8px); }
          45%  { transform: translateX(-5px); }
          60%  { transform: translateX(5px); }
          75%  { transform: translateX(-3px); }
          90%  { transform: translateX(3px); }
        }
        @keyframes wcPulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(139,92,246,0.5)) drop-shadow(0 0 24px rgba(59,130,246,0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(139,92,246,0.8)) drop-shadow(0 0 40px rgba(59,130,246,0.5)) drop-shadow(0 0 60px rgba(236,72,153,0.25));
          }
        }
        @keyframes wcShimmer {
          0%   { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 12px rgba(139,92,246,0.2); }
          33%  { border-color: rgba(59,130,246,0.6);  box-shadow: 0 0 12px rgba(59,130,246,0.25); }
          66%  { border-color: rgba(236,72,153,0.5); box-shadow: 0 0 12px rgba(236,72,153,0.2); }
          100% { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 12px rgba(139,92,246,0.2); }
        }
        @keyframes wcFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wc-pill-new {
          animation: wcSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .wc-shake {
          animation: wcShake 0.6s ease-in-out;
        }
        .wc-shimmer {
          animation: wcShimmer 1.4s ease-in-out infinite;
        }
        .wc-pulse-glow {
          animation: wcPulseGlow 3s ease-in-out infinite;
        }
        .wc-fade-up {
          animation: wcFadeUp 0.4s ease-out;
        }
        .wc-chain-scroll::-webkit-scrollbar { display: none; }
        .wc-chain-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .wc-input {
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .wc-input:focus {
          border-color: rgba(139,92,246,0.7) !important;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.15), 0 0 16px rgba(139,92,246,0.15);
          outline: none;
        }
        .wc-btn-primary {
          transition: opacity 0.2s, transform 0.1s;
        }
        .wc-btn-primary:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .wc-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>

			<div
				style={{
					background:
						"radial-gradient(ellipse at 50% 30%, #1a1040 0%, #0f0f1a 65%)",
					borderRadius: 16,
					padding: "28px 20px",
					minHeight: 440,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					overflow: "hidden",
					border: "1px solid rgba(255,255,255,0.06)",
				}}
			>
				{/* Score bar — positioned inside flow, not absolute */}

				{/* ---- TURNSTILE PHASE ---- */}
				{phase === "turnstile" && (
					<div
						className="wc-fade-up flex flex-col items-center gap-6 text-center w-full"
						style={{ maxWidth: 400 }}
					>
						<div>
							<h2
								className="font-bold mb-3"
								style={{
									fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
									background:
										"linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
									lineHeight: 1.1,
								}}
							>
								Word Chain
							</h2>
							<p
								style={{
									color: "rgba(255,255,255,0.45)",
									fontSize: "0.95rem",
									lineHeight: 1.65,
									maxWidth: 320,
								}}
							>
								Start with a word. Type something associated with it. Each valid
								link extends your chain — how far can you go?
							</p>
						</div>

						<div ref={turnstileContainerRef} />

						<button
							type="button"
							onClick={startGame}
							disabled={!turnstileToken}
							className="wc-btn-primary px-10 py-4 rounded-xl font-semibold"
							style={{
								background: turnstileToken
									? "linear-gradient(135deg, #7c3aed, #4f46e5)"
									: "rgba(255,255,255,0.08)",
								color: turnstileToken ? "#fff" : "rgba(255,255,255,0.25)",
								cursor: turnstileToken ? "pointer" : "not-allowed",
								border: "none",
								fontSize: "1.05rem",
								letterSpacing: "0.01em",
								marginTop: 4,
							}}
						>
							{turnstileToken ? "Start Game" : "Verifying..."}
						</button>
					</div>
				)}

				{/* ---- PLAYING PHASE ---- */}
				{phase === "playing" && (
					<div
						className="flex flex-col items-center gap-5 w-full"
						style={{ maxWidth: 600 }}
					>
						{/* Score bar */}
						<div
							className="flex gap-4 font-mono text-sm justify-center"
							style={{ color: "rgba(255,255,255,0.5)" }}
						>
							<span>
								Chain: <strong style={{ color: "#a78bfa" }}>{score}</strong>
							</span>
							<span>
								Best: <strong style={{ color: "#fbbf24" }}>{highScore}</strong>
							</span>
						</div>

						{/* Current word */}
						<div className="text-center">
							<div
								style={{
									color: "rgba(255,255,255,0.35)",
									fontSize: "0.7rem",
									letterSpacing: "0.18em",
									textTransform: "uppercase",
									marginBottom: 10,
									fontWeight: 600,
								}}
							>
								Current Word
							</div>
							<div
								className="wc-pulse-glow font-bold select-none"
								style={{
									fontSize: "clamp(2.25rem, 9vw, 4rem)",
									background:
										"linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
									lineHeight: 1.1,
									letterSpacing: "-0.01em",
								}}
							>
								{currentWord}
							</div>
						</div>

						{/* Chain pills */}
						{chain.length > 0 && (
							<div
								ref={chainScrollRef}
								className="wc-chain-scroll flex gap-2 w-full pb-2"
								style={{
									overflowX: "auto",
									flexWrap: "nowrap",
									flexShrink: 0,
								}}
							>
								{chain.map((word, i) => (
									<span
										key={word}
										className={newWord === word ? "wc-pill-new" : ""}
										style={{
											display: "inline-flex",
											alignItems: "center",
											padding: "5px 14px",
											borderRadius: 999,
											fontSize: "0.82rem",
											fontWeight: 600,
											color: "#fff",
											background: PILL_GRADIENTS[i % PILL_GRADIENTS.length],
											opacity: i === chain.length - 1 ? 1 : 0.55,
											whiteSpace: "nowrap",
											transition: "opacity 0.3s",
											letterSpacing: "0.01em",
										}}
									>
										{word}
									</span>
								))}
							</div>
						)}

						{/* Input area */}
						<div className="flex flex-col items-center gap-2 w-full">
							<input
								ref={inputRef}
								type="text"
								value={inputValue}
								onChange={(e) =>
									setInputValue(
										e.target.value.toLowerCase().replace(/[^a-z]/g, ""),
									)
								}
								onKeyDown={handleKeyDown}
								placeholder="Type a related word..."
								disabled={validating}
								className={`wc-input w-full text-center text-xl font-semibold rounded-xl px-4 py-3 ${shaking ? "wc-shake" : ""} ${validating ? "wc-shimmer" : ""}`}
								style={{
									maxWidth: 360,
									background: "rgba(255,255,255,0.05)",
									border: "2px solid rgba(139,92,246,0.3)",
									color: "#e2e8f0",
									caretColor: "#a78bfa",
								}}
								autoComplete="off"
								autoCapitalize="none"
								autoCorrect="off"
								spellCheck={false}
							/>

							<div
								style={{ height: 20, display: "flex", alignItems: "center" }}
							>
								{validating && (
									<span
										style={{
											color: "rgba(255,255,255,0.35)",
											fontSize: "0.8rem",
										}}
									>
										AI is judging...
									</span>
								)}
								{reason && !validating && (
									<span
										style={{
											color: "#f87171",
											fontSize: "0.82rem",
											textAlign: "center",
										}}
									>
										{reason}
									</span>
								)}
							</div>
						</div>

						<div
							style={{
								color: "rgba(255,255,255,0.18)",
								fontSize: "0.72rem",
								letterSpacing: "0.05em",
							}}
						>
							Press Enter to submit
						</div>
					</div>
				)}

				{/* ---- GAME OVER PHASE ---- */}
				{phase === "gameOver" && (
					<div
						className="wc-fade-up flex flex-col items-center gap-5 text-center w-full"
						style={{ maxWidth: 600 }}
					>
						<div>
							<div
								className="font-bold mb-1"
								style={{
									color: "#f87171",
									fontSize: "1.6rem",
									letterSpacing: "-0.01em",
								}}
							>
								Chain Broken
							</div>
							<p
								style={{
									color: "rgba(255,255,255,0.4)",
									fontSize: "0.9rem",
									marginTop: 4,
								}}
							>
								{finalScore === 0
									? "Better luck next time!"
									: finalScore >= 10
										? `Incredible run — ${finalScore} link${finalScore === 1 ? "" : "s"}!`
										: `You linked ${finalScore} word${finalScore === 1 ? "" : "s"}.`}
							</p>
							{finalReason && (
								<p
									style={{
										color: "rgba(248,113,113,0.7)",
										fontSize: "0.82rem",
										marginTop: 8,
										maxWidth: 320,
										margin: "8px auto 0",
									}}
								>
									{finalReason}
								</p>
							)}
						</div>

						{/* Chain replay */}
						{finalChain.length > 0 && (
							<div
								className="flex gap-2 w-full justify-center"
								style={{ flexWrap: "wrap" }}
							>
								{finalChain.map((word, i) => (
									<span
										key={word}
										style={{
											display: "inline-flex",
											alignItems: "center",
											padding: "5px 14px",
											borderRadius: 999,
											fontSize: "0.82rem",
											fontWeight: 600,
											color: "#fff",
											background: PILL_GRADIENTS[i % PILL_GRADIENTS.length],
											opacity: replayIndex >= i ? 1 : 0.15,
											transform: replayIndex === i ? "scale(1.12)" : "scale(1)",
											transition: "opacity 0.2s ease, transform 0.2s ease",
											whiteSpace: "nowrap",
											letterSpacing: "0.01em",
										}}
									>
										{word}
									</span>
								))}
							</div>
						)}

						<div
							style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}
						>
							Best: <strong style={{ color: "#fbbf24" }}>{highScore}</strong>
						</div>

						<button
							type="button"
							onClick={handlePlayAgain}
							className="wc-btn-primary px-10 py-4 rounded-xl font-semibold"
							style={{
								background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
								color: "#fff",
								border: "none",
								fontSize: "1rem",
								cursor: "pointer",
								letterSpacing: "0.01em",
								marginTop: 4,
							}}
						>
							Play Again
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
