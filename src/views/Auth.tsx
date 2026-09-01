import AuthCard from '@/auth/AuthCard'
import PageContainer from './PageContainer'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'

export default function Auth() {
	return (
		<PageContainer whereUserIs={USER_IS_IN.AUTH} className='grid place-items-center'>
			<AuthCard />
		</PageContainer>
	)
}
