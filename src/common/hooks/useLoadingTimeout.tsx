import { SessionType } from '@/auth/contexts/SessionProvider'
import { useEffect, useState } from 'react'

interface UseLoadingTimeoutParams {
	session: SessionType
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
