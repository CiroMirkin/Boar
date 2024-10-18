import { ColumnList } from './ColumnList'
import { Header } from '../Header'
import { USER_IS_IN } from '../userIsIn'
import { WelcomeDialog } from './WelcomeDialog'
import { useBoard } from '@/hooks/useBoard'
import { TaskListInEachColumnProvider } from '@/contexts/TaskListInEachColumnContext'
import { ColumnListProvider } from '@/contexts/ColumnListContext'

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
