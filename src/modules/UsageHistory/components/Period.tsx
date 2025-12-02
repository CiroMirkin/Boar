import { UsageSession } from '../model/usageHistory'
import { parseDuration } from '../utils/parseDuration'
import { formatTime } from '@/sharedByModules/utils/formatTime'

interface PeriodProps {
	period: UsageSession
}

function Period({ period }: PeriodProps) {
	const startTime = formatTime(new Date(period.startTimestamp))
	const endTime = formatTime(new Date(period.startTimestamp + period.duration))
	const duration = parseDuration(period.duration)

	return (
		<li className='pr-10 pb-2 border-b border-gray-600 last:border-b-0'>
			{/* El tiempo esta al reves a proposito, para mostrar 13:30 - 11:10 en vez de 11:10 - 13:30 */}
			<span className='font-semibold'>{`${endTime} - ${startTime}`}</span>
			<div>{duration}</div>
		</li>
	)
}

export default Period
