import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { Archive, CircleHelp, Columns3, Github, Menu, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { iconSize } from '@/sharedByModules/configs/iconsConstants'
import { USER_IS_IN } from './userIsIn'
import { LanguageToggle } from './LanguageToggle'
import { useTranslation } from 'react-i18next'
import LogInAndLogOutMenuItem from './LogInAndLogOutMenuItem'
import { useSession } from '@/SessionProvider'
import Notes from '@/modules/notes/Notes'

interface HeaderProps {
	title: string
	whereUserIs?: USER_IS_IN
}
export function Header({ title, whereUserIs }: HeaderProps) {
	const { t } = useTranslation()
	const { session } = useSession()

	return (
		<header className='w-full px-6 md:px-11 pt-6 pb-4 flex justify-between items-center'>
			<h1 className='text-2xl font-medium'>{title}</h1>
			<div className='flex gap-2 items-center'>
				<Notes/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='text-black'>
							<Menu size={iconSize} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Boar</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.BOARD && true}>
							<Link to='/' className='px-2 py-1.5 flex items-center'>
								<Columns3 size={iconSize} className='mr-2' /> {t('menu.board')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.ARCHIVE && true}>
							<Link to='/archive' className='px-2 py-1.5 flex items-center'>
								<Archive size={iconSize} className='mr-2' /> {t('menu.archive')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.CONFIG && true}>
							<Link to='/settings' className='px-2 py-1.5 flex items-center'>
								<Settings size={iconSize} className='mr-2' /> {t('menu.configs')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LanguageToggle />
						<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.HELP && true}>
							<Link to='/help' className='px-2 py-1.5 flex items-center'>
								<CircleHelp size={iconSize} className='mr-2' /> {t('menu.help')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<a href='https://github.com/CiroMirkin/Boar' className='px-2 py-1.5 flex items-center'>
								<Github size={iconSize} className='mr-2' /> GitHub
							</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LogInAndLogOutMenuItem 
							whereUserIs={whereUserIs} 
							session={session}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
