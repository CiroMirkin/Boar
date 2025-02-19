import { Header } from '../../components/Header'
import { USER_IS_IN } from '../../components/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useColorTheme } from './hooks/useColorTheme'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()
	const { bg, text } = useColorTheme()
	
	return (
		<div className={`h-screen ${bg} ${text}`}>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
				{ children }
			<WelcomeDialog />
		</div>
	)
}
