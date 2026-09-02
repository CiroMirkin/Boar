import { USER_IS_IN } from '@/shared/ui/organisms/userIsIn'
import PageContainer from './PageContainer'
import { UsageHistory } from '@/features/usage-history'
import { useTranslation } from 'react-i18next'
import { useSyncBoardIdFromRoute } from '@/features/auth'

export function TimeTracking() {
	const { t } = useTranslation()
	useSyncBoardIdFromRoute()
	return (
		<PageContainer
			title={t('usage_history.title')}
			whereUserIs={USER_IS_IN.TIME}
			className='px-6 md:px-11 pb-6 pt-4'
		>
			<UsageHistory />
		</PageContainer>
	)
}
