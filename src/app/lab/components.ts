/**
 * Experiment Component Registry
 *
 * Maps experiment slugs to their custom React components for MDX rendering.
 * When creating a new experiment with interactive components:
 * 1. Create the component in content/experiments/<slug>/
 * 2. Add an entry here mapping the slug to the component(s)
 * 3. Components are lazy-loaded via next/dynamic so they don't bloat the main bundle
 *
 * Experiments without interactive components don't need an entry here.
 *
 * Example:
 *   import dynamic from 'next/dynamic'
 *
 *   export const experimentComponents: Record<string, Record<string, ComponentType<any>>> = {
 *     'ai-snake-game': {
 *       SnakeGame: dynamic(() => import('content/experiments/ai-snake-game/SnakeGame')),
 *     },
 *   }
 */
import type { ComponentType } from 'react'

export const experimentComponents: Record<string, Record<string, ComponentType<any>>> = {}
