import { ColumnList } from './columnList/ColumnList'
import { Header } from '../components/Header'
import { USER_IS_IN } from '../components/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/board/hooks/useBoard'
import { TaskListInEachColumnProvider } from '@/board/taskList/contexts/TaskListInEachColumnContext'
import { ColumnListProvider } from '@/board/columnList/context/ColumnListContext'

export function Board() {
	const data = useBoard()

	return (
		<>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
			<ColumnListProvider>
				<TaskListInEachColumnProvider>
					<ColumnList />
				</TaskListInEachColumnProvider>
			</ColumnListProvider>
			<WelcomeDialog />
		</>
	)
}
