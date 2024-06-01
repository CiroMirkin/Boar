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
import { iconSize } from '@/configs/iconsConstants'
import { USER_IS_IN } from './userIsIn'

interface HeaderProps {
	title: string
	whereUserIs?: USER_IS_IN
}
export function Header({ title, whereUserIs }: HeaderProps) {
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
							<Columns3 size={iconSize} className='mr-2' /> Tablero
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.ARCHIVE && true}>
						<Link to='/archive' className='flex items-center'>
							<Archive size={iconSize} className='mr-2' /> Archivo
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.CONFIG && true}>
						<Link to='/settings' className='flex items-center'>
							<Settings size={iconSize} className='mr-2' /> Ajustes
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem disabled={whereUserIs === USER_IS_IN.HELP && true}>
						<Link to='/help' className='flex items-center'>
							<CircleHelp size={iconSize} className='mr-2' /> Ayuda
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
