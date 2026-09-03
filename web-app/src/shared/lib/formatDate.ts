import { format } from '@formkit/tempo'

export const formatDate = (date: string | Date) => {
	return format(date, {
		date: 'short',
	})
}
