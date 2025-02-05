import { useContext } from 'react'
import { Column } from './components/Column'
import { ColumnListContext } from '@/pages/board/columnList/context/ColumnListContext'
import { TaskList } from '../taskList/TaskList'
import { ScrollArea } from '../../../ui/scroll-area'
import { TaskListInEachColumnContext } from '@/pages/board/taskList/contexts/TaskListInEachColumnContext'
import { useReminder } from '@/pages/board/configs/hooks/useReminder'

export function ColumnList() {
	const columns = useContext(ColumnListContext)
	const taskListInEachColumn = useContext(TaskListInEachColumnContext)
	useReminder(taskListInEachColumn)

	const columnsContent: React.ReactNode[] = []
	taskListInEachColumn.forEach((taskList) => {
		columnsContent.push(
			<ScrollArea className='h-full w-full rounded-md'>
				<TaskList tasks={taskList} />
			</ScrollArea>
		)
	})

	

	const columnList = columns.map((column, columnIndex) => {
		return (
			<Column data={column} key={column.id}>
				<Column.ColumnContent className='min-h-64 md:h-[60vh] w-full'>
					{columnsContent[columnIndex] && columnsContent[columnIndex]}
				</Column.ColumnContent>
				<Column.Footer />
			</Column>
		)
	})

	return (
		<div className='h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch gap-y-3 gap-x-4'>
			{columnList}
		</div>
	)
}
