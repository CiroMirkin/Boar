import { useState, useEffect, useRef, useCallback } from 'react'

interface TimeTracking {
	currentPage: string
	pageStartTime: number
	totalTimeByPage: { [page: string]: number }
}

interface UseTimeTrackingReturn {
	totalTimeByPage: { [page: string]: number }
	navigateToPage: (page: string) => void
	getTotalTime: () => number
}

const initialTracking: TimeTracking = {
	currentPage: '/',
	pageStartTime: Date.now(),
	totalTimeByPage: {},
}

export const useTimeTracking = (): UseTimeTrackingReturn => {
	const [tracking, setTracking] = useState<TimeTracking>(() => {
		try {
			const saved = localStorage.getItem('timeTracking')
			return saved ? JSON.parse(saved) : initialTracking
		} catch {
			return initialTracking
		}
	})

	const trackingRef = useRef(tracking)

	useEffect(() => {
		trackingRef.current = tracking
	}, [tracking])

	useEffect(() => {
		localStorage.setItem('timeTracking', JSON.stringify(tracking))
	}, [tracking])

	const navigateToPage = useCallback((page: string) => {
		const now = Date.now()
		const currentTracking = trackingRef.current

		const timeSpentOnCurrentPage = now - currentTracking.pageStartTime

		setTracking((prev) => ({
			currentPage: page,
			pageStartTime: now,
			totalTimeByPage: {
				...prev.totalTimeByPage,
				[prev.currentPage]:
					(prev.totalTimeByPage[prev.currentPage] || 0) + timeSpentOnCurrentPage,
			},
		}))
	}, [])

	const getTotalTime = useCallback(() => {
		return Object.values(tracking.totalTimeByPage).reduce((total, time) => total + time, 0)
	}, [tracking.totalTimeByPage])

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'hidden') {
				const now = Date.now()
				const timeSpent = now - trackingRef.current.pageStartTime

				setTracking((prev) => ({
					...prev,
					totalTimeByPage: {
						...prev.totalTimeByPage,
						[prev.currentPage]:
							(prev.totalTimeByPage[prev.currentPage] || 0) + timeSpent,
					},
					pageStartTime: now,
				}))
			} else {
				// Cuando la página vuelve a ser visible, reiniciar el contador
				setTracking((prev) => ({
					...prev,
					pageStartTime: Date.now(),
				}))
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
	}, [])

	return {
		totalTimeByPage: tracking.totalTimeByPage,
		navigateToPage,
		getTotalTime,
	}
}
