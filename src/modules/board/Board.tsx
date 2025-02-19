import { Header } from '../../components/Header'
import { USER_IS_IN } from '../../components/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()

	return (
		<>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
				{ children }
			<WelcomeDialog />
		</>
	)
}
