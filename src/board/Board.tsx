import { Header } from '../components/Header'
import { USER_IS_IN } from '../components/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/board/hooks/useBoard'
import ColumnListContainer from '../columnList/ColumnListContainer'

export function Board() {
	const data = useBoard()

	return (
		<>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
				<ColumnListContainer />
			<WelcomeDialog />
		</>
	)
}
