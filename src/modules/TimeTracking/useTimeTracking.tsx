import { useState, useEffect, useRef, useCallback } from 'react'

interface TimeTracking {
	currentPage: string
	pageStartTime: number
	totalTimeByPage: { [page: string]: number }
	lastSaveTime: number
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
	lastSaveTime: Date.now(),
}

export const useTimeTracking = (): UseTimeTrackingReturn => {
	const [tracking, setTracking] = useState<TimeTracking>(() => {
		try {
			const saved = localStorage.getItem('timeTracking')
			if (saved) {
				const parsed = JSON.parse(saved)
				return {
					...parsed,
					pageStartTime: Date.now(),
					lastSaveTime: Date.now(),
				}
			}
			return initialTracking
		} catch {
			return initialTracking
		}
	})

	const trackingRef = useRef(tracking)

	useEffect(() => {
		trackingRef.current = tracking
	}, [tracking])

	useEffect(() => {
		const trackingToSave = {
			...tracking,
			lastSaveTime: Date.now(),
		}
		localStorage.setItem('timeTracking', JSON.stringify(trackingToSave))
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
			lastSaveTime: prev.lastSaveTime,
		}))
	}, [])

	const getTotalTime = useCallback(() => {
		return Object.values(tracking.totalTimeByPage).reduce((total, time) => total + time, 0)
	}, [tracking.totalTimeByPage])

	useEffect(() => {
		const handleVisibilityChange = () => {
			const now = Date.now()

			if (document.visibilityState === 'hidden') {
				const timeSpent = now - trackingRef.current.pageStartTime

				setTracking((prev) => ({
					...prev,
					totalTimeByPage: {
						...prev.totalTimeByPage,
						[prev.currentPage]:
							(prev.totalTimeByPage[prev.currentPage] || 0) + timeSpent,
					},
					pageStartTime: now,
					lastSaveTime: now,
				}))
			} else {
				setTracking((prev) => ({
					...prev,
					pageStartTime: Date.now(),
				}))
			}
		}

		const handleBeforeUnload = () => {
			const now = Date.now()
			const timeSpent = now - trackingRef.current.pageStartTime

			const finalTracking = {
				...trackingRef.current,
				totalTimeByPage: {
					...trackingRef.current.totalTimeByPage,
					[trackingRef.current.currentPage]:
						(trackingRef.current.totalTimeByPage[trackingRef.current.currentPage] ||
							0) + timeSpent,
				},
				lastSaveTime: now,
			}

			localStorage.setItem('timeTracking', JSON.stringify(finalTracking))
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return {
		totalTimeByPage: tracking.totalTimeByPage,
		navigateToPage,
		getTotalTime,
	}
}
