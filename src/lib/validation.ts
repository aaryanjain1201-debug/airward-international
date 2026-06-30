export function sanitize(str: string): string {
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 5000)
}

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitize(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(v => typeof v === 'string' ? sanitize(v) : v)
    } else {
      sanitized[key] = value
    }
  }
  return sanitized
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone: string): boolean {
  return /^\+?[\d\s-]{10,15}$/.test(phone)
}

export function validatePrice(price: number): boolean {
  return typeof price === 'number' && price > 0 && price < 10000000
}

export function validateRequired(fields: Record<string, any>, required: string[]): string | null {
  for (const field of required) {
    if (!fields[field] || (typeof fields[field] === 'string' && !fields[field].trim())) {
      return `${field} is required`
    }
  }
  return null
}