import { TaskList } from './components/TaskList'
import { useReminder } from '@/modules/taskList/components/Reminder/hooks/useReminder'
import { useReminderQuery } from '@/modules/taskList/components/Reminder/hooks/useReminderQuery'
import { useTaskListInEachColumn } from './hooks/useTaskListInEachColumn'
import { useTranslation } from 'react-i18next'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import { useTheme } from '@/sharedByModules/hooks/useTheme'

/** La propiedad columnPosition es el indice de la columna mas uno */
const getColumnPosition = (taskListIndex: number): string => `${taskListIndex + 1}`

export function TaskListInEachColumn() {
	const taskListInEachColumn = useTaskListInEachColumn()
	const { reminder } = useReminderQuery()
	const colors = useTheme()

	useReminder(taskListInEachColumn, reminder)
	const { t } = useTranslation()

	const columnsContent: React.ReactNode[] = []
	// Si todas las listas de tareas estan vacias
	let sumOfEachTaskList = 0
	taskListInEachColumn.forEach((taskList) => (sumOfEachTaskList += Number(taskList.length)))
	if (sumOfEachTaskList == 0) {
		taskListInEachColumn.forEach((taskList, index) => {
			columnsContent.push(
				index == 0 ? (
					<EmptySpaceText className={`min-h-64 md:min-h-[60vh] pt-4 px-4 ${colors.columnText || 'text-black'}`}>
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
		columnsContent.push(
			<TaskList
				key={`column-${index}`}
				tasks={taskList}
				columnPosition={getColumnPosition(index)}
			/>
		)
	})

	return columnsContent
}
