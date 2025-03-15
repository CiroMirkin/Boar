import { useContext, useEffect, useState } from 'react'
import { useToast } from '@/ui/use-toast'
import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { ReminderContext } from './ReminderContext'
import { useTheme } from '@/sharedByModules/Theme/ThemeContext'

/** Si existe un recordatorio observa la columna indicada por el usuario y al ingresar una nueva tarea muestra el recordatorio en el tablero.  */
export const useReminder = (taskListInEachColumn: TaskListInEachColumn) => {
	const [copyOfTheLengthOfEachTaskList, setCopyOfTheLengthOfEachTaskList] = useState([
		0, 0, 0,
	] as Array<number>)
	const { toast } = useToast()
	const reminderColor  = useTheme().reminder
	const { reminder } = useContext(ReminderContext) 

	useEffect(() => {
		const columnPosition: number = Number(reminder.columnPosition) - 1 // La posicion de una columna es su index + 1
		const columnExists = Number(reminder.columnPosition) <= Number(taskListInEachColumn.length)
		if (!!reminder.text && columnExists) {
			if (
				taskListInEachColumn[columnPosition].length >
				copyOfTheLengthOfEachTaskList[columnPosition]
			) {
				// Si la lista de tareas a observar tiene una nueva tarea
				setCopyOfTheLengthOfEachTaskList(
					taskListInEachColumn.map((taskList) => taskList.length)
				)
				toast({
					description: reminder.text,
					duration: 3000,
					className: `${reminderColor} border-black border-2`,
				})
			} else if (
				taskListInEachColumn[columnPosition].length <
				copyOfTheLengthOfEachTaskList[columnPosition]
			) {
				// Si la lista de tareas a observar dejo de tener una tarea
				setCopyOfTheLengthOfEachTaskList(
					taskListInEachColumn.map((taskList) => taskList.length)
				)
			}
		}
	}, [taskListInEachColumn])
}
