import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { Archive, CircleHelp, Columns3, Github, Menu, Settings, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'
import { iconSize } from '@/configs/iconsConstants'
import { USER_IS_IN } from './userIsIn'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useLocalStorage } from "@uidotdev/usehooks"

interface HeaderProps {
	title: string
	whereUserIs?: USER_IS_IN
}
export function Header({ title, whereUserIs }: HeaderProps) {
  	const [position, setPosition] = useLocalStorage("language", "es")
	const { t, i18n } = useTranslation()

	if(i18n.language !== position) {
		i18next.changeLanguage(position)
		document.body.dir = i18n.dir()
	}

	const handleValueChange = (value: string) => {
		setPosition(value)
		i18next.changeLanguage(value)
		document.body.dir = i18n.dir()
	}

	return (
		<header className='w-full px-6 md:px-11 py-7 flex justify-between items-start'>
			<h1 className='text-4xl font-normal'>{title}</h1>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>
						<Menu size={iconSize} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Boar</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.BOARD && true}>
						<Link to='/' className='flex items-center'>
							<Columns3 size={iconSize} className='mr-2' /> { t('menu.board') }
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.ARCHIVE && true}>
						<Link to='/archive' className='flex items-center'>
							<Archive size={iconSize} className='mr-2' /> { t('menu.archive') }
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.CONFIG && true}>
						<Link to='/settings' className='flex items-center'>
							<Settings size={iconSize} className='mr-2' /> { t('menu.configs') }
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<Languages size={iconSize} className='mr-2' /> { t('menu.language') }
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuRadioGroup value={position} onValueChange={handleValueChange}>
									<DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.HELP && true}>
						<Link to='/help' className='flex items-center'>
							<CircleHelp size={iconSize} className='mr-2' /> { t('menu.help') }
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<a href='https://github.com/CiroMirkin/Boar' className='flex items-center'>
							<Github size={iconSize} className='mr-2' /> GitHub
						</a>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}
