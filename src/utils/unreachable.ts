export function assertUnreachable(x: never, opts?: { message?: string }): never {
  const { message } = opts ?? {}
  throw new Error(`Should not have reached here with ${x}${message ? `message: ${message}` : ''}`)
}
