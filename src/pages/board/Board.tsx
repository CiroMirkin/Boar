import { ColumnList } from './columnList/ColumnList'
import { Header } from '../Header'
import { USER_IS_IN } from '../userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/pages/board/hooks/useBoard'
import { TaskListInEachColumnProvider } from '@/pages/board/taskList/contexts/TaskListInEachColumnContext'
import { ColumnListProvider } from '@/pages/board/columnList/context/ColumnListContext'

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
