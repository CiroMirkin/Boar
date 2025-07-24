import { DropdownMenuItem } from "@/ui/dropdown-menu"
import { USER_IS_IN } from "./userIsIn"
import { Link } from "react-router-dom"
import { LogIn, LogOut } from "lucide-react"
import { iconSize } from "../configs/iconsConstants"
import { useTranslation } from "react-i18next"
import { AuthError, Session } from "@supabase/supabase-js"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { useDispatch } from "react-redux"
import { setBoardByDefault as setUserBoardByDefault } from "../utils/setUserBoardByDefault"

interface LogInAndLogOutMenuItemProps { 
	whereUserIs?: USER_IS_IN, 
	session: Session | null,
}

export default function LogInAndLogOutMenuItem({ whereUserIs, session }: LogInAndLogOutMenuItemProps) {
    const { t } = useTranslation()
	const dispatch = useDispatch()

	// Handle log out
	const handleOnClick = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if(error) throw error
			toast.success(t('successful_log_out_toast'))
			setUserBoardByDefault(dispatch)
		}
		catch(error) {
			const authError = error as AuthError
			toast.error(authError.message)
		}
	}

    return (
        <DropdownMenuItem disabled={ whereUserIs === USER_IS_IN.AUTH && true }>
			{
				!session ? (
					<Link to='/auth' className='px-2 py-1.5 flex items-center'>
					    <LogIn size={iconSize} className='mr-2' />
							{t('sing_in')}
					</Link>
				) : (
					<span onClick={handleOnClick} className='px-2 py-1.5 flex items-center'>
						<LogOut size={iconSize} className='mr-2' />
						{t('log_out')}
					</span>
				)
			}
		</DropdownMenuItem>
    )
}