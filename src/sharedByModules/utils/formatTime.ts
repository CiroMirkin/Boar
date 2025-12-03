import { format } from '@formkit/tempo'

/** Formato -> HH:MM */
export const formatTime = (date: string | Date) => {
	return format(date, 'HH:mm')
}
