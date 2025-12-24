import { useState } from 'react'
import { useVisibilityChange } from '@uidotdev/usehooks'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/molecules/dropdown-menu'
import { Button } from '@/ui/atoms/button'
import {
	ArchiveIcon,
	CircleHelpIcon,
	ColumnsIcon,
	GithubIcon,
	HourglassIcon,
	MenuIcon,
	SettingsIcon,
} from '@/ui/atoms/icons'
import { USER_IS_IN } from './userIsIn'
import { LanguageToggle } from '../../modules/LanguageToggle/LanguageToggle'
import { useTranslation } from 'react-i18next'
import LogInAndLogOutMenuItem from '../../modules/LanguageToggle/LogInAndLogOutMenuItem'
import { useSession } from '@/auth/hooks/useSession'
import Notes from '@/modules/notes/Notes'
import { useTheme } from '@/common/hooks/useTheme'
import { useLastDurationPeriod } from '@/modules/UsageHistory/hooks/useLastDurationPeriod'
import { useTypeOfView } from '@/modules/TypeOfView/useTypeOfView'
import { TransitionLink } from '../atoms/TransitionLink'

interface HeaderProps {
	title: string
	whereUserIs?: USER_IS_IN
}
export function Header({ title, whereUserIs }: HeaderProps) {
	const { t } = useTranslation()
	const { session } = useSession()
	const { text } = useTheme()
	const typeOfView = useTypeOfView()

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const documentVisible = useVisibilityChange()

	const isVisible = isDropdownOpen && documentVisible
	const duration = useLastDurationPeriod({ isVisible })

	return (
		<header className='w-full px-6 md:px-11 pt-6 pb-4 flex justify-between items-center'>
			<h1 className='text-2xl font-medium'>{title}</h1>
			<div className='flex gap-2 items-center'>
				{typeOfView !== 'NOTE-LIST' && <Notes />}
				<DropdownMenu onOpenChange={setIsDropdownOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className={text}>
							<MenuIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Boar</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.BOARD && true}>
							<TransitionLink
								to='/'
								unstable_viewTransition
								className='px-2 py-1.5 flex items-center'
							>
								<ColumnsIcon className='mr-2' /> {t('menu.board')}
							</TransitionLink>
						</DropdownMenuItem>
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.ARCHIVE && true}>
							<TransitionLink
								to='/archive'
								unstable_viewTransition
								className='px-2 py-1.5 flex items-center'
							>
								<ArchiveIcon className='mr-2' /> {t('menu.archive')}
							</TransitionLink>
						</DropdownMenuItem>
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.CONFIG && true}>
							<TransitionLink
								to='/settings'
								unstable_viewTransition
								className='px-2 py-1.5 flex items-center'
							>
								<SettingsIcon className='mr-2' /> {t('menu.configs')}
							</TransitionLink>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LanguageToggle />
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.HELP && true}>
							<TransitionLink to='/help' className='px-2 py-1.5 flex items-center'>
								<CircleHelpIcon className='mr-2' /> {t('menu.help')}
							</TransitionLink>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<a
								href='https://github.com/CiroMirkin/Boar'
								className='px-2 py-1.5 flex items-center'
							>
								<GithubIcon className='mr-2' /> GitHub
							</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.TIME && true}>
							<TransitionLink
								title={t('usage_history.title')}
								to='/time'
								className='px-2 py-1.5 flex items-center'
							>
								<HourglassIcon className='mr-2' /> {duration}
							</TransitionLink>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LogInAndLogOutMenuItem whereUserIs={whereUserIs} session={session} />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
