import { AuthCard } from '@/features/auth'
import PageContainer from '../../_components/PageContainer'
import { USER_IS_IN } from '@/shared/ui/organisms/userIsIn'

export default function Auth() {
	return (
		<PageContainer whereUserIs={USER_IS_IN.AUTH} className='grid place-items-center'>
			<AuthCard />
		</PageContainer>
	)
}
