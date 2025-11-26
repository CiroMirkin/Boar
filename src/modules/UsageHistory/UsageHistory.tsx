import { useUsageHistoryQuery } from './useUsageHistoryQuery'
import UsageRecord from './components/UsageRecord'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import { Spinner } from '@/ui/atoms/spinner'

export default function UsageHistory() {
	const { usageHistory, isLoading } = useUsageHistoryQuery()

	if (isLoading) return <Spinner size={30} />

	const theUsageHistoryIsEmpty = !usageHistory.length
	const usageRecords = [...usageHistory]
		.map((usageRecord) => <UsageRecord key={usageRecord.date} usageRecord={usageRecord} />)
		.reverse()

	return (
		<div className='flex flex-wrap gap-4'>
			{theUsageHistoryIsEmpty && (
				<EmptySpaceText>Aun no hay registros de tiempo.</EmptySpaceText>
			)}
			{usageRecords}
		</div>
	)
}
