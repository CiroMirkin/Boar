import { useUsageHistoryQuery } from './hooks/useUsageHistoryQuery'
import UsageRecord from './components/UsageRecord'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import { Spinner } from '@/ui/atoms/spinner'
import { useTranslation } from 'react-i18next'

export default function UsageHistory() {
	const { t } = useTranslation()
	const { usageHistory, isLoading } = useUsageHistoryQuery()

	if (isLoading) return <Spinner size={30} />

	const theUsageHistoryIsEmpty = !usageHistory.length
	const usageRecords = [...usageHistory]
		.map((usageRecord) => <UsageRecord key={usageRecord.date} usageRecord={usageRecord} />)
		.reverse()

	return (
		<div className='flex flex-wrap gap-4'>
			{theUsageHistoryIsEmpty && <EmptySpaceText>{t('usage_history.empty')}</EmptySpaceText>}
			{usageRecords}
		</div>
	)
}
