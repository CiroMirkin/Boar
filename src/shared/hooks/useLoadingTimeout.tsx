'use client'

import { useEffect, useState } from 'react'

interface UseLoadingTimeoutParams {
	/** Sesión actual: solo se mira `user?.id`. Tipo local para no depender de `features/auth`. */
	session: { user?: { id?: string } } | null
	isLoading: boolean
	timeout?: number
}

export function useLoadingTimeout({ session, isLoading, timeout = 1000 }: UseLoadingTimeoutParams) {
	const [showSpinner, setShowSpinner] = useState(true)

	const isAuthenticated = session?.user?.id !== undefined && session?.user?.id !== 'guest'
	const shouldShowSpinner = !session || (isAuthenticated && isLoading)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSpinner(false)
		}, timeout)

		if (!shouldShowSpinner) {
			setShowSpinner(false)
			clearTimeout(timer)
		}

		return () => clearTimeout(timer)
	}, [shouldShowSpinner, timeout])

	return shouldShowSpinner && showSpinner
}
