import { useContext } from 'react'
import { TaskList } from './TaskList'
import { ScrollArea } from '@/ui/scroll-area'
import { TaskListInEachColumnContext } from '@/modules/columnList/taskList/contexts/TaskListInEachColumnContext'
import { useReminder } from '@/modules/columnList/taskList/Reminder/useReminder'

export function TaskListInEachColumn() {
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

    return columnsContent
}