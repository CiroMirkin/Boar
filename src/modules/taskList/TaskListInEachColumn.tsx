import { TaskList } from './components/TaskList'
import { ScrollArea } from '@/ui/scroll-area'
import { useReminder } from '@/modules/taskList/Reminder/useReminder'
import { useTaskListInEachColumn } from './hooks/useTaskListInEachColumn'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useSession } from '@/SessionProvider'
import { useSaveTaskListOfColumns } from './state/useSaveTaskListOfColumns'

export function TaskListInEachColumn() {
    const taskListInEachColumn = useTaskListInEachColumn()

	const { session } = useSession()
	useEffect(() => {
		useSaveTaskListOfColumns({ session, data: taskListInEachColumn })
	}, [taskListInEachColumn])

	useReminder(taskListInEachColumn)
	const { t } = useTranslation()

	const columnsContent: React.ReactNode[] = []
	
	// Si todas las listas de tareas estan vacias
	let sumOfEachTaskList = 0;
	taskListInEachColumn.forEach(taskList => sumOfEachTaskList += Number(taskList.length))
	if(sumOfEachTaskList == 0){
		taskListInEachColumn.forEach((taskList, index) => {
			columnsContent.push(
				index == 0 
				? <p className="text-xl opacity-50">
					{ t("empty_first_task_list_copy") }
				</p>
				: <ScrollArea className='h-full w-full rounded-md'>
					<TaskList tasks={taskList} />
				</ScrollArea>
			)
		})
		return columnsContent
	}
	
	taskListInEachColumn.forEach((taskList) => {
		columnsContent.push(
			<ScrollArea className='h-full w-full rounded-md'>
				<TaskList tasks={taskList} />
			</ScrollArea>
		)
	})

    return columnsContent
}