import { format } from '@formkit/tempo'

export const formatTime = (date: string | Date) => {
	return format(date, {
		time: 'short',
	})
}
