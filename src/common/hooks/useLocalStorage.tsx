'use client'

import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(initialValue)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item !== null) setStoredValue(JSON.parse(item))
		} catch {
			setStoredValue(initialValue)
		}
	}, [key])

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setStoredValue((prev) => {
				const next = value instanceof Function ? value(prev) : value
				try {
					window.localStorage.setItem(key, JSON.stringify(next))
				} catch {
					setStoredValue(prev)
				}
				return next
			})
		},
		[key]
	)

	return [storedValue, setValue]
}
