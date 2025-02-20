import { Header } from '../shared/Header/Header'
import { USER_IS_IN } from '../shared/Header/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useColorTheme } from './hooks/useColorTheme'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()
	const { bg, text } = useColorTheme()
	
	return (
		<div className={`xl:h-screen sm:h-full ${bg} ${text}`}>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
				{ children }
			<WelcomeDialog />
		</div>
	)
}
