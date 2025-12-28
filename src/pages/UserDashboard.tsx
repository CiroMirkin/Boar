import { useSession } from '@/auth/hooks/useSession'
import { useTheme } from '@/common/hooks/useTheme'
import Dashboard from '@/modules/Dashboard/Dashboard'
import { LanguageToggle } from '@/modules/LanguageToggle/LanguageToggle'
import LogInAndLogOutMenuItem from '@/modules/LanguageToggle/LogInAndLogOutMenuItem'
import { Button } from '@/ui/atoms/button'
import { CircleHelpIcon, GithubIcon, MenuIcon } from '@/ui/atoms/icons'
import { Spinner } from '@/ui/atoms/spinner'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/molecules/dropdown-menu'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import PageContainer from './PageContainer'

function UserDashboard() {
	const { text, bg } = useTheme()
	const { t } = useTranslation()
	const whereUserIs = USER_IS_IN.DASHBOARD
	const { session, isLoading } = useSession()

	if (isLoading) {
		return (
			<PageContainer title='Board' whereUserIs={USER_IS_IN.DASHBOARD}>
				<div className='min-w-48 min-h-64 md:min-h-[60vh] flex items-center justify-center'>
					<Spinner size={30} />
				</div>
			</PageContainer>
		)
	}

	if (!session) {
		return <Navigate to='/board/1' replace />
	}

	return (
		<div className={`w-full px-6 md:px-11 ${bg}`}>
			<header className='w-full pt-6 pb-4 flex justify-between items-center'>
				<h1 className='text-2xl font-medium'>Boar</h1>
				<div className='flex gap-2 items-center'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className={text}>
								<MenuIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Boar</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<LanguageToggle />
							<DropdownMenuItem>
								<Link to='/help' className='px-2 py-1.5 flex items-center'>
									<CircleHelpIcon className='mr-2' /> {t('menu.help')}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<a
									href='https://github.com/CiroMirkin/Boar'
									className='px-2 py-1.5 flex items-center'
								>
									<GithubIcon className='mr-2' /> GitHub
								</a>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<LogInAndLogOutMenuItem whereUserIs={whereUserIs} session={session} />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<section className='min-h-[calc(100vh-5rem)]'>
				<Dashboard />
			</section>
		</div>
	)
}

export default UserDashboard
