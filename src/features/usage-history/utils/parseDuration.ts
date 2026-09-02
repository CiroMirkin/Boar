import { UsageDuration } from '../model/usageHistory'

/** @description Formato -> HH:MM:SS */
export const parseDuration = (duration: UsageDuration): string => {
	const date = new Date(duration)
	const hours = String(date.getUTCHours()).padStart(2, '0')
	const minutes = String(date.getUTCMinutes()).padStart(2, '0')
	const seconds = String(date.getUTCSeconds()).padStart(2, '0')

	return `${hours}:${minutes}:${seconds}`
}
