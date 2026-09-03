import { USER_IS_IN } from '@/shared/ui/organisms/userIsIn'
import PageContainer from '../_components/PageContainer'
import { useTranslation } from 'react-i18next'
import { ThemeSelection } from '@/shared/preferences/theme'

function UserDashboardSettings() {
	const { t } = useTranslation()
	return (
		<PageContainer
			title={t('menu.configs')}
			whereUserIs={USER_IS_IN.CONFIG}
			showBoardNavigation={false}
			className='px-3 pb-6 grid place-items-center'
		>
			<div className='grid gap-4 justify-items-stretch '>
				<ThemeSelection target='dashboard' />
			</div>
		</PageContainer>
	)
}

export default UserDashboardSettings
