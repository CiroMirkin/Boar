import { TaskList } from './TaskList'
import { ScrollArea } from '@/ui/scroll-area'
import { useReminder } from '@/modules/taskList/Reminder/useReminder'
import { useTaskListInEachColumn } from './hooks/useTaskListInEachColumn'
import LocalStorageTaskListInEachColumnRepository from './state/localStorageTaskLists'

export function TaskListInEachColumn() {
    const taskListInEachColumn = useTaskListInEachColumn()
	new LocalStorageTaskListInEachColumnRepository().save(taskListInEachColumn)
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