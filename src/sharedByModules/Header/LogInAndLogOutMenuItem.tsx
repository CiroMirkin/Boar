import { DropdownMenuItem } from "@/ui/dropdown-menu"
import { USER_IS_IN } from "./userIsIn"
import { Link } from "react-router-dom"
import { LogIn, LogOut } from "lucide-react"
import { iconSize } from "../configs/iconsConstants"
import { useTranslation } from "react-i18next"
import { Session } from "@supabase/supabase-js"
import { Dispatch, SetStateAction } from "react"
import { useToast } from "@/ui/use-toast"

interface LogInAndLogOutMenuItemProps { 
	whereUserIs?: USER_IS_IN, 
	session: Session | null,
    setSession: Dispatch<SetStateAction<Session | null>> 
}

export default function LogInAndLogOutMenuItem({ whereUserIs, session, setSession }: LogInAndLogOutMenuItemProps) {
    const { t } = useTranslation()
	const { toast } = useToast()

	const handleOnClick = () => {
		setSession(null)
		toast({
			description: t('successful_log_out_toast')
		})
	}

    return (
        <DropdownMenuItem disabled={ whereUserIs === USER_IS_IN.AUTH && true }>
			{
				!session ? (
					<Link to='/auth' className='flex items-center'>
					    <LogIn size={iconSize} className='mr-2' />
							{t('sing_in')}
					</Link>
				) : (
					<span onClick={handleOnClick} className='flex items-center'>
						<LogOut size={iconSize} className='mr-2' />
						{t('log_out')}
					</span>
				)
			}
		</DropdownMenuItem>
    )
}