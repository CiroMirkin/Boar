import { useState, useEffect, useRef, useCallback } from 'react'
import { UsageDuration } from './model/usageHistory'

interface UseTimeTrackingReturn {
	totalSessionTime: UsageDuration
	getTotalTime: () => UsageDuration
}

interface UserSessionTracking {
	sessionStartTime: number
	totalAccumulatedTime: UsageDuration
	lastSaveTime: number
	isActive: boolean
}

const initialTracking: UserSessionTracking = {
	sessionStartTime: Date.now(),
	totalAccumulatedTime: 0,
	lastSaveTime: Date.now(),
	isActive: true,
}

export const useTimeTracking = (): UseTimeTrackingReturn => {
	const [tracking, setTracking] = useState<UserSessionTracking>(() => {
		try {
			const saved = localStorage.getItem('timeTracking')
			if (saved) {
				const parsed = JSON.parse(saved)
				return {
					...parsed,
					sessionStartTime: Date.now(),
					isActive: true,
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
		localStorage.setItem('timeTracking', JSON.stringify(tracking))
	}, [tracking])

	const getTotalTime = useCallback((): UsageDuration => {
		const now = Date.now()
		if (tracking.isActive) {
			return tracking.totalAccumulatedTime + (now - tracking.sessionStartTime)
		}
		return tracking.totalAccumulatedTime
	}, [tracking.totalAccumulatedTime, tracking.sessionStartTime, tracking.isActive])

	useEffect(() => {
		const handleVisibilityChange = () => {
			const now = Date.now()

			if (document.visibilityState === 'hidden') {
				setTracking((prev) => ({
					...prev,
					totalAccumulatedTime: prev.totalAccumulatedTime + (now - prev.sessionStartTime),
					isActive: false,
					lastSaveTime: now,
				}))
			} else {
				setTracking((prev) => ({
					...prev,
					sessionStartTime: Date.now(),
					isActive: true,
					lastSaveTime: now,
				}))
			}
		}

		const handleBeforeUnload = () => {
			const now = Date.now()
			const currentTracking = trackingRef.current

			if (currentTracking.isActive) {
				const finalTime: UsageDuration =
					currentTracking.totalAccumulatedTime + (now - currentTracking.sessionStartTime)

				const finalTracking = {
					...currentTracking,
					totalAccumulatedTime: finalTime,
					isActive: false,
					lastSaveTime: now,
				}

				localStorage.setItem('timeTracking', JSON.stringify(finalTracking))
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		window.addEventListener('beforeunload', handleBeforeUnload)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return {
		totalSessionTime: getTotalTime(),
		getTotalTime,
	}
}
