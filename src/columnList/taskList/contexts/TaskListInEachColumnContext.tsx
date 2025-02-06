import { ReactNode, createContext, useEffect } from 'react'
import { TaskListInEachColumn } from '@/columnList/taskList/models/taskList'
import { useTaskListInEachColumn } from '@/columnList/taskList/hooks/useTaskListInEachColumn'
import LocalStorageTaskListInEachColumnRepository from '@/columnList/taskList/state/localStorageTaskLists'
import { TaskListInEachColumnRepository } from '@/columnList/taskList/models/taskListInEachColumnRepository'

export const TaskListInEachColumnContext = createContext([[], [], []] as TaskListInEachColumn)

const taskListInEachColumnRepository: TaskListInEachColumnRepository =
	new LocalStorageTaskListInEachColumnRepository()

export function TaskListInEachColumnProvider({ children }: { children: ReactNode }) {
	const taskListInEachColumn = useTaskListInEachColumn()

	useEffect(() => {
		taskListInEachColumnRepository.save(taskListInEachColumn)
	}, [taskListInEachColumn])

	return (
		<TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
			{children}
		</TaskListInEachColumnContext.Provider>
	)
}
