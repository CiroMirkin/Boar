import { useSession } from '@/auth/hooks/useSession'
import { useTheme } from '@/common/hooks/useTheme'
import Dashboard from '@/modules/Dashboard/Dashboard'
import { Spinner } from '@/ui/atoms/spinner'

import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { Navigate } from 'react-router-dom'
import PageContainer from './PageContainer'
import { Header } from '@/ui/organisms/Header'

function UserDashboard() {
	const { bg } = useTheme()
	const whereUserIs = USER_IS_IN.DASHBOARD
	const { session, isLoading } = useSession()

	if (isLoading) {
		return (
			<PageContainer title='Board' whereUserIs={whereUserIs}>
				<div className='min-w-48 min-h-64 md:min-h-[60vh] flex items-center justify-center'>
					<Spinner size={30} />
				</div>
			</PageContainer>
		)
	}

	if (!session) {
		return <Navigate to='/board/1' replace />
	}

	return (
		<div className={`w-full px-6 md:px-11 ${bg}`}>
			<Header title='Boar' whereUserIs={USER_IS_IN.DASHBOARD} showBoardNavigation={false} />
			<section className='min-h-[calc(100vh-5rem)]'>
				<Dashboard />
			</section>
		</div>
	)
}

export default UserDashboard
