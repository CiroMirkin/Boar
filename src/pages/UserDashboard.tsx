import { useSession } from '@/auth/hooks/useSession'
import { useTheme } from '@/common/hooks/useTheme'
import Dashboard from '@/modules/Dashboard/Dashboard'
import { Spinner } from '@/ui/atoms/spinner'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { Navigate } from 'react-router-dom'
import PageContainer from './PageContainer'

function UserDashboard() {
	const { bg } = useTheme()
	const whereUserIs = USER_IS_IN.DASHBOARD
	const { session, isLoading } = useSession()

	if (isLoading) {
		return (
			<PageContainer title='Boar' whereUserIs={whereUserIs}>
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
		<div className={`${bg}`}>
			<PageContainer title='Boar' whereUserIs={whereUserIs} showBoardNavigation={false}>
				<section className='min-h-[calc(100vh-5rem)] px-4 md:px-8'>
					<Dashboard />
				</section>
			</PageContainer>
		</div>
	)
}

export default UserDashboard
