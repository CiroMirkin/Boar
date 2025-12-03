import { UserSessionTracking } from './useTimeTracking'

const STORAGE_KEY = 'timeTracking'

export const getUserSessionTracking = () => {
	return sessionStorage.getItem(STORAGE_KEY)
}

export const saveUserSessionTracking = (updated: UserSessionTracking) => {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export const resetUserSessionTracking = () => sessionStorage.removeItem(STORAGE_KEY)

export const getCurrentTimeFromStorage = (): number => {
	try {
		const saved = getUserSessionTracking()
		if (saved) {
			const parsed: UserSessionTracking = JSON.parse(saved)
			const now = Date.now()
			if (parsed.isActive) {
				return parsed.totalAccumulatedTime + (now - parsed.sessionStartTime)
			}
			return parsed.totalAccumulatedTime
		}
	} catch (error) {
		console.error('Error reading time tracking:', error)
	}

	return 0
}
