import { useEffect, useState } from 'react'
import { parseDuration } from '../utils/parseDuration'
import { getCurrentTimeFromStorage } from './userSessionTracking'

interface UseAdaptiveDurationOptions {
	isVisible?: boolean
	visibleUpdateInterval?: number
}

export const useLastDurationPeriod = (options: UseAdaptiveDurationOptions = {}): string => {
	const { isVisible = false, visibleUpdateInterval = 1000 } = options
	const [duration, setDuration] = useState('00:00:00')

	useEffect(() => {
		const calculateDuration = () => {
			const totalTime = getCurrentTimeFromStorage()
			return parseDuration(totalTime)
		}

		setDuration(calculateDuration())

		if (!isVisible) {
			return
		}

		const intervalId = setInterval(() => {
			setDuration(calculateDuration())
		}, visibleUpdateInterval)

		return () => clearInterval(intervalId)
	}, [isVisible, visibleUpdateInterval])

	return duration
}
