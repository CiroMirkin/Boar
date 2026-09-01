'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Returns `false` during SSR and the first (hydration) client render, then
 * `true` once hydration has completed.
 *
 * Uses `useSyncExternalStore` with a dedicated server snapshot so React knows
 * the server and client values differ, instead of seeding the value from a
 * mount-only `useEffect`.
 */
export function useIsHydrated(): boolean {
	return useSyncExternalStore(
		subscribe,
		() => true,
		() => false
	)
}
