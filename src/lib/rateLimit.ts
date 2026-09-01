
interface Bucket {
	count: number
	resetAt: number
}

const buckets = new Map<string, Bucket>()

/**
 * Devuelve `true` si `key` ya superó `max` llamadas dentro de la ventana móvil de `windowMs`. Cada llamada cuenta.
 */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
	const now = Date.now()
	const bucket = buckets.get(key)

	if (!bucket || now > bucket.resetAt) {
		buckets.set(key, { count: 1, resetAt: now + windowMs })
		return false
	}

	bucket.count++
	return bucket.count > max
}

/** Sólo para tests. */
export function __resetRateLimit(): void {
	buckets.clear()
}
