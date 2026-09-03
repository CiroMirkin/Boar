import { format } from '@formkit/tempo'

export const getFullDate = (): string => {
	return format(new Date(), { date: 'full' })
}
