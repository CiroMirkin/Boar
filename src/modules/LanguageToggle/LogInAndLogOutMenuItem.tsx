import { DropdownMenuItem } from '@/ui/molecules/dropdown-menu'
import { USER_IS_IN } from '../../ui/organisms/userIsIn'
import { Link } from 'react-router-dom'
import { LogInIcon, LogOutIcon } from '@/ui/atoms/icons'
import { useTranslation } from 'react-i18next'
import { AuthError, Session } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface LogInAndLogOutMenuItemProps {
	whereUserIs?: USER_IS_IN
	session: Session | null
}

export default function LogInAndLogOutMenuItem({
	whereUserIs,
	session,
}: LogInAndLogOutMenuItemProps) {
	const { t } = useTranslation()

	// Handle log out
	const handleOnClick = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			sessionStorage.removeItem('isInitialLoad')
			if (error) throw error
			toast.success(t('successful_log_out_toast'))
		} catch (error) {
			const authError = error as AuthError
			toast.error(authError.message)
		}
	}

	return (
		<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.AUTH && true}>
			{!session ? (
				<Link to='/auth' className='px-2 py-1.5 flex items-center'>
					<LogInIcon className='mr-2' />
					{t('sing_in')}
				</Link>
			) : (
				<span onClick={handleOnClick} className='px-2 py-1.5 flex items-center'>
					<LogOutIcon className='mr-2' />
					{t('log_out')}
				</span>
			)}
		</DropdownMenuItem>
	)
}
