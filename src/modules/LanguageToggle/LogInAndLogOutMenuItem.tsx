import { DropdownMenuItem } from '@/ui/molecules/dropdown-menu'
import { USER_IS_IN } from '../../ui/organisms/userIsIn'
import { TransitionLink } from '@/ui/atoms/TransitionLink'
import { LogInIcon, LogOutIcon } from '@/ui/atoms/icons'
import { useTranslation } from 'react-i18next'
import { AuthError, Session } from '@supabase/supabase-js'
import { toast } from 'sonner'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

interface LogInAndLogOutMenuItemProps {
	whereUserIs?: USER_IS_IN
	session: Session | null
}

export default function LogInAndLogOutMenuItem({
	whereUserIs,
	session,
}: LogInAndLogOutMenuItemProps) {
	const { t } = useTranslation()

	const handleOnClick = async () => {
		const logOutPromise = async () => {
			if (!isSupabaseConfigured || !supabase) {
				throw new Error('Supabase no configurado')
			}

			const { error } = await supabase.auth.signOut()
			sessionStorage.removeItem('isInitialLoad')

			if (error) throw error
		}

		toast.promise(logOutPromise(), {
			loading: t('loading', { defaultValue: 'Cargando...' }),
			success: t('successful_log_out_toast'),
			error: (error: AuthError) => {
				return (
					error.message || t('log_out_error', { defaultValue: 'Error al cerrar sesión' })
				)
			},
		})
	}

	return (
		<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.AUTH && true}>
			{!session ? (
				<TransitionLink to='/auth' className='px-2 py-1.5 flex items-center'>
					<LogInIcon className='mr-2' />
					{t('sing_in')}
				</TransitionLink>
			) : (
				<span onClick={handleOnClick} className='px-2 py-1.5 flex items-center'>
					<LogOutIcon className='mr-2' />
					{t('log_out')}
				</span>
			)}
		</DropdownMenuItem>
	)
}
