'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type GameState = 'idle' | 'playing' | 'gameOver'
interface Position { x: number; y: number }

const GRID_SIZE = 20
const TICK_MS = 130
const HIGH_SCORE_KEY = 'ai-snake-highscore'

const COLORS = {
  bg: '#1a1a2e',
  grid: 'rgba(255,255,255,0.04)',
  snakeHead: '#60a5fa',
  snakeTail: '#a78bfa',
  food: '#f9bb56',
  foodGlow: 'rgba(249,187,86,0.3)',
  text: '#e2e8f0',
  overlay: 'rgba(0,0,0,0.7)',
}

function oppositeDir(d: Direction): Direction {
  return d === 'UP' ? 'DOWN' : d === 'DOWN' ? 'UP' : d === 'LEFT' ? 'RIGHT' : 'LEFT'
}

function randomFood(snake: Position[]): Position {
  const occupied = new Set(snake.map(p => `${p.x},${p.y}`))
  const open: Position[] = []
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!occupied.has(`${x},${y}`)) open.push({ x, y })
    }
  }
  return open[Math.floor(Math.random() * open.length)] ?? { x: 10, y: 10 }
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState(400)

  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }])
  const dirRef = useRef<Direction>('RIGHT')
  const nextDirRef = useRef<Direction>('RIGHT')
  const foodRef = useRef<Position>(randomFood([{ x: 10, y: 10 }]))
  const scoreRef = useRef(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [gameState, setGameState] = useState<GameState>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Touch tracking
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY)
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {}
  }, [])

  // Responsive canvas sizing
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const w = Math.min(container.offsetWidth, 480)
      setCanvasSize(w)
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = canvasSize
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cell = size / GRID_SIZE

    // Background
    ctx.fillStyle = COLORS.bg
    ctx.fillRect(0, 0, size, size)

    // Grid lines
    ctx.strokeStyle = COLORS.grid
    ctx.lineWidth = 1
    for (let i = 1; i < GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cell, 0)
      ctx.lineTo(i * cell, size)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * cell)
      ctx.lineTo(size, i * cell)
      ctx.stroke()
    }

    // Food with glow
    const food = foodRef.current
    const fx = food.x * cell + cell / 2
    const fy = food.y * cell + cell / 2
    const pulse = 0.8 + 0.2 * Math.sin(Date.now() / 200)

    ctx.beginPath()
    ctx.arc(fx, fy, cell * 0.6 * pulse, 0, Math.PI * 2)
    ctx.fillStyle = COLORS.foodGlow
    ctx.fill()

    ctx.beginPath()
    ctx.arc(fx, fy, cell * 0.35, 0, Math.PI * 2)
    ctx.fillStyle = COLORS.food
    ctx.fill()

    // Snake
    const snake = snakeRef.current
    const len = snake.length
    const pad = cell * 0.08
    const radius = cell * 0.2

    snake.forEach((seg, i) => {
      const t = len > 1 ? i / (len - 1) : 0
      const r = Math.round(96 + (167 - 96) * t)
      const g = Math.round(165 + (139 - 165) * t)
      const b = Math.round(250 + (250 - 250) * t)
      ctx.fillStyle = `rgb(${r},${g},${b})`

      const x = seg.x * cell + pad
      const y = seg.y * cell + pad
      const w = cell - pad * 2
      const h = cell - pad * 2

      ctx.beginPath()
      ctx.roundRect(x, y, w, h, radius)
      ctx.fill()

      // Eyes on head
      if (i === 0) {
        ctx.fillStyle = '#fff'
        const eyeSize = cell * 0.08
        const dir = dirRef.current
        const ox = dir === 'LEFT' ? -cell * 0.12 : dir === 'RIGHT' ? cell * 0.12 : 0
        const oy = dir === 'UP' ? -cell * 0.12 : dir === 'DOWN' ? cell * 0.12 : 0
        const cx = seg.x * cell + cell / 2
        const cy = seg.y * cell + cell / 2

        if (dir === 'UP' || dir === 'DOWN') {
          ctx.beginPath()
          ctx.arc(cx - cell * 0.15 + ox, cy + oy, eyeSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(cx + cell * 0.15 + ox, cy + oy, eyeSize, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(cx + ox, cy - cell * 0.15 + oy, eyeSize, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(cx + ox, cy + cell * 0.15 + oy, eyeSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    })
  }, [canvasSize])

  // Animation loop for smooth food pulsing
  useEffect(() => {
    let raf: number
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [draw])

  // Game tick
  const tick = useCallback(() => {
    const snake = [...snakeRef.current]
    const dir = nextDirRef.current
    dirRef.current = dir

    const head = snake[0]
    const newHead = { ...head }

    if (dir === 'UP') newHead.y--
    else if (dir === 'DOWN') newHead.y++
    else if (dir === 'LEFT') newHead.x--
    else if (dir === 'RIGHT') newHead.x++

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      endGame()
      return
    }

    // Self collision
    if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      endGame()
      return
    }

    snake.unshift(newHead)

    // Eat food
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      const newScore = scoreRef.current + 1
      scoreRef.current = newScore
      setScore(newScore)
      foodRef.current = randomFood(snake)

      // Update high score
      try {
        const saved = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10)
        if (newScore > saved) {
          localStorage.setItem(HIGH_SCORE_KEY, String(newScore))
          setHighScore(newScore)
        }
      } catch {}
    } else {
      snake.pop()
    }

    snakeRef.current = snake
  }, [])

  const endGame = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
    setGameState('gameOver')
  }, [])

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }]
    dirRef.current = 'RIGHT'
    nextDirRef.current = 'RIGHT'
    foodRef.current = randomFood([{ x: 10, y: 10 }])
    scoreRef.current = 0
    setScore(0)
    setGameState('playing')
  }, [])

  // Start/stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      tickRef.current = setInterval(tick, TICK_MS)
      return () => {
        if (tickRef.current) clearInterval(tickRef.current)
      }
    }
  }, [gameState, tick])

  // Direction change helper
  const changeDirection = useCallback((newDir: Direction) => {
    if (oppositeDir(newDir) !== dirRef.current) {
      nextDirRef.current = newDir
    }
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      }
      const dir = keyMap[e.key]
      if (!dir) return

      e.preventDefault()

      if (gameState === 'idle') {
        startGame()
        changeDirection(dir)
      } else if (gameState === 'playing') {
        changeDirection(dir)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameState, startGame, changeDirection])

  // Touch/swipe controls
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const touch = e.changedTouches[0]
      const dx = touch.clientX - touchStartRef.current.x
      const dy = touch.clientY - touchStartRef.current.y
      touchStartRef.current = null

      const minSwipe = 30
      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return

      let dir: Direction
      if (Math.abs(dx) > Math.abs(dy)) {
        dir = dx > 0 ? 'RIGHT' : 'LEFT'
      } else {
        dir = dy > 0 ? 'DOWN' : 'UP'
      }

      if (gameState === 'idle') {
        startGame()
        changeDirection(dir)
      } else if (gameState === 'playing') {
        changeDirection(dir)
      }
    }

    const preventScroll = (e: TouchEvent) => e.preventDefault()

    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', preventScroll, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', preventScroll)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [gameState, startGame, changeDirection])

  // D-pad button handler
  const handleDpad = useCallback((dir: Direction) => {
    if (gameState === 'idle') {
      startGame()
      changeDirection(dir)
    } else if (gameState === 'playing') {
      changeDirection(dir)
    }
  }, [gameState, startGame, changeDirection])

  return (
    <div className="not-prose my-8" ref={containerRef}>
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        {/* Score bar */}
        <div className="flex justify-between items-center mb-2 px-1 text-sm font-mono" style={{ color: COLORS.text }}>
          <span>Training Progress: <strong>{score}</strong></span>
          <span>Best: <strong>{highScore}</strong></span>
        </div>

        {/* Canvas with overlays */}
        <div className="relative rounded-lg overflow-hidden" style={{ width: canvasSize, height: canvasSize }}>
          <canvas
            ref={canvasRef}
            aria-label="AI Snake Game"
            className="block"
            style={{ width: canvasSize, height: canvasSize }}
          />

          {/* Idle overlay */}
          {gameState === 'idle' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer"
              style={{ backgroundColor: COLORS.overlay }}
              onClick={startGame}
            >
              <div className="text-2xl font-bold" style={{ color: COLORS.food }}>AI Snake</div>
              <div className="text-sm" style={{ color: COLORS.text }}>
                <span className="hidden md:inline">Press any arrow key to start</span>
                <span className="md:hidden">Tap to start</span>
              </div>
            </div>
          )}

          {/* Game over overlay */}
          {gameState === 'gameOver' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ backgroundColor: COLORS.overlay }}
            >
              <div className="text-xl font-bold" style={{ color: '#ef4444' }}>Training Failed</div>
              <div className="text-sm" style={{ color: COLORS.text }}>
                Data points collected: <strong>{score}</strong>
              </div>
              <button
                onClick={startGame}
                className="mt-2 px-4 py-2 rounded font-semibold text-sm transition-colors"
                style={{ backgroundColor: COLORS.food, color: '#1a1a2e' }}
              >
                Train Again
              </button>
            </div>
          )}
        </div>

        {/* D-pad for mobile */}
        <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
          <button
            onClick={() => handleDpad('UP')}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl active:opacity-70 transition-opacity"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: COLORS.text }}
            aria-label="Up"
          >
            &#9650;
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => handleDpad('LEFT')}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl active:opacity-70 transition-opacity"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: COLORS.text }}
              aria-label="Left"
            >
              &#9664;
            </button>
            <div className="w-12 h-12" />
            <button
              onClick={() => handleDpad('RIGHT')}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl active:opacity-70 transition-opacity"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: COLORS.text }}
              aria-label="Right"
            >
              &#9654;
            </button>
          </div>
          <button
            onClick={() => handleDpad('DOWN')}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl active:opacity-70 transition-opacity"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: COLORS.text }}
            aria-label="Down"
          >
            &#9660;
          </button>
        </div>

        {/* Desktop hint */}
        <div className="hidden md:block mt-3 text-center text-xs text-slate-500">
          Arrow keys or WASD to move
        </div>
      </div>
    </div>
  )
}
