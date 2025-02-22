import { TaskList } from './TaskList'
import { ScrollArea } from '@/ui/scroll-area'
import { useReminder } from '@/modules/columnList/taskList/Reminder/useReminder'
import { useTaskListInEachColumn } from './hooks/useTaskListInEachColumn'

export function TaskListInEachColumn() {
    const taskListInEachColumn = useTaskListInEachColumn()
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