import { Header } from '../../sharedByModules/Header/Header'
import { USER_IS_IN } from '../../sharedByModules/Header/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useContext } from 'react'
import { ThemeContext } from '../../sharedByModules/Theme/ThemeContext'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()
	const { theme } = useContext(ThemeContext)
	const { bg, text } = theme

	return (
		<div className={`xl:h-screen sm:h-full ${bg} ${text}`}>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
			{children}
			<WelcomeDialog />
		</div>
	)
}
