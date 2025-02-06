import { useContext } from 'react'
import { Column } from './components/Column'
import { useColumnList } from './hooks/useColumnList' 
import { TaskList } from './taskList/TaskList'
import { ScrollArea } from '../ui/scroll-area'
import { TaskListInEachColumnContext } from '@/columnList/taskList/contexts/TaskListInEachColumnContext'
import { useReminder } from '@/board/configs/hooks/useReminder'

export function ColumnList() {
	const columns = useColumnList()
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
		<>
			{columnList}
		</>
	)
}
