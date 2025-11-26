import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import PageContainer from './PageContainer'
import UsageHistory from '@/modules/UsageHistory/UsageHistory'

export function TimeTracking() {
	return (
		<PageContainer
			title='Registro de uso'
			whereUserIs={USER_IS_IN.TIME}
			className='px-6 md:px-11 pb-6 pt-4'
		>
			<UsageHistory />
		</PageContainer>
	)
}
