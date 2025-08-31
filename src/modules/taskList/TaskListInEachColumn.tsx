import { TaskList } from './components/TaskList'
import { useReminder } from '@/modules/taskList/Reminder/useReminder'
import { useTaskListInEachColumn } from './hooks/useTaskListInEachColumn'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { useSession } from '@/SessionProvider'
import { useSaveTaskListOfColumns } from './state/useSaveTaskListOfColumns'
import { emptyTaskListInEachColumn } from './models/taskList'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'

/** La propiedad columnPosition es el indice de la columna mas uno */
const getColumnPosition = (taskListIndex: number): string => `${taskListIndex + 1}`

export function TaskListInEachColumn() {
	const taskListInEachColumn = useTaskListInEachColumn()
	const taskListInEachColumnRef = useRef(emptyTaskListInEachColumn)

	const { session } = useSession()
	useEffect(() => {
		const taskListInEachColumnLikeString = JSON.stringify(taskListInEachColumn)
		// Si la lista de tareas actualmente esta vacia y anteriormente contuvo informacion
		if (taskListInEachColumnLikeString == JSON.stringify(emptyTaskListInEachColumn)) {
			if (
				taskListInEachColumnLikeString !== JSON.stringify(taskListInEachColumnRef.current)
			) {
				useSaveTaskListOfColumns({
					session,
					data: taskListInEachColumn,
					emptyData: true,
				})
			}
		} else {
			useSaveTaskListOfColumns({ session, data: taskListInEachColumn })
		}
		taskListInEachColumnRef.current = taskListInEachColumn
	}, [taskListInEachColumn])

	useReminder(taskListInEachColumn)
	const { t } = useTranslation()

	const columnsContent: React.ReactNode[] = []
	// Si todas las listas de tareas estan vacias
	let sumOfEachTaskList = 0
	taskListInEachColumn.forEach((taskList) => (sumOfEachTaskList += Number(taskList.length)))
	if (sumOfEachTaskList == 0) {
		taskListInEachColumn.forEach((taskList, index) => {
			columnsContent.push(
				index == 0 ? (
					<EmptySpaceText className='min-h-64 md:min-h-[60vh] pt-4 px-4'>
						{t('empty_first_task_list_copy')}
					</EmptySpaceText>
				) : (
					<TaskList tasks={taskList} columnPosition={getColumnPosition(index)} />
				)
			)
		})
		return columnsContent
	}

	taskListInEachColumn.forEach((taskList, index) => {
		columnsContent.push(<TaskList tasks={taskList} columnPosition={getColumnPosition(index)} />)
	})

	return columnsContent
}
