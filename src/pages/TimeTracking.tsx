import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import PageContainer from './PageContainer'
import UsageHistory from '@/modules/UsageHistory/UsageHistory'
import { useTranslation } from 'react-i18next'

export function TimeTracking() {
	const { t } = useTranslation()
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
