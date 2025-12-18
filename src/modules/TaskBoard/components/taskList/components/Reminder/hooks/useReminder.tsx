import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { TaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/models/taskListInEachColumn'
import { Reminder } from '../reminder'

/** Si existe un recordatorio observa la columna indicada por el usuario y al ingresar una nueva tarea muestra el recordatorio en el tablero.  */
export const useReminder = (
	taskListInEachColumn: TaskListInEachColumn,
	reminder: Reminder | undefined
) => {
	const [copyOfTheLengthOfEachTaskList, setCopyOfTheLengthOfEachTaskList] = useState([
		0, 0, 0,
	] as Array<number>)

	useEffect(() => {
		if (!reminder) return

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
				toast.info(reminder.text)
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
	}, [taskListInEachColumn, reminder, copyOfTheLengthOfEachTaskList])
}
