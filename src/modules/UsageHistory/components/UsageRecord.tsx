import { DailyUsage } from '../model/usageHistory'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/molecules/card'
import { formatDate } from '@/commond/utils/formatDate'
import Period from './Period'
import { useTheme } from '@/commond/hooks/useTheme'
import { parseDuration } from '../utils/parseDuration'

interface UsageRecordProps {
	usageRecord: DailyUsage
}

function UsageRecord({ usageRecord }: UsageRecordProps) {
	const { column } = useTheme()
	const date = formatDate(new Date(usageRecord.date))
	let totalDuration = 0
	const periods = [...usageRecord.periods].reverse().map((period) => {
		totalDuration += period.duration
		return <Period key={period.startTimestamp} period={period} />
	})

	return (
		<Card className={'pt-4 rounded-md shadow-sm ' + column}>
			<CardHeader className='p-0'>
				<CardTitle className='text-2xl'>{date}</CardTitle>
				<CardDescription className='text-base !m-0' title='Total de tiempo'>
					{parseDuration(totalDuration)}
				</CardDescription>
			</CardHeader>
			<CardContent className='mt-4'>
				<ul className='flex flex-col gap-2'>{periods}</ul>
			</CardContent>
		</Card>
	)
}

export default UsageRecord
