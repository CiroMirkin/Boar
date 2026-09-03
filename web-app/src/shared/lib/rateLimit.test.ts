import { beforeEach, describe, expect, it, vi } from 'vitest'
import { __resetRateLimit, isRateLimited } from './rateLimit'

describe('isRateLimited', () => {
	beforeEach(() => {
		__resetRateLimit()
		vi.useRealTimers()
	})

	it('deja pasar hasta `max` llamadas y bloquea la siguiente', () => {
		const results = Array.from({ length: 4 }, () => isRateLimited('a', 3, 1000))
		expect(results).toEqual([false, false, false, true])
	})

	it('cuenta cada key por separado', () => {
		isRateLimited('a', 1, 1000)
		expect(isRateLimited('a', 1, 1000)).toBe(true)
		expect(isRateLimited('b', 1, 1000)).toBe(false)
	})

	it('reinicia el contador cuando pasa la ventana', () => {
		vi.useFakeTimers()
		expect(isRateLimited('a', 1, 1000)).toBe(false)
		expect(isRateLimited('a', 1, 1000)).toBe(true)
		vi.advanceTimersByTime(1001)
		expect(isRateLimited('a', 1, 1000)).toBe(false)
	})
})
