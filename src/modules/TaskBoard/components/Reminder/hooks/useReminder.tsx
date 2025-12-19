import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { TaskListArray } from '../model/reminder'
import { useReminderQuery } from './useReminderQuery'

/** Observa la lista de tareas y muestra el recordatorio definido por el usuario. */
export const useReminder = <T,>(tasksList: TaskListArray<T>) => {
	const previousLengthsRef = useRef<Array<number>>([0, 0, 0])
	const { reminder } = useReminderQuery()

	useEffect(() => {
		if (!reminder) return

		const columnPosition: number = Number(reminder.columnPosition) - 1
		const columnExists = Number(reminder.columnPosition) <= Number(tasksList.length)

		if (!!reminder.text && columnExists) {
			const currentLength = tasksList[columnPosition].length
			const previousLength = previousLengthsRef.current[columnPosition]

			if (currentLength !== previousLength) {
				previousLengthsRef.current = tasksList.map((taskList) => taskList.length)

				if (currentLength > previousLength) {
					toast.info(reminder.text)
				}
			}
		}
	}, [tasksList, reminder])
}
