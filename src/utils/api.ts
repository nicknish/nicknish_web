const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export function removeEmptyItems(obj: Record<string, any>): Record<string, any> {
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  }
  return obj
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}
