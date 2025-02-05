import { ReactNode, createContext, useEffect } from 'react'
import { TaskListInEachColumn } from '@/board/taskList/models/taskList'
import { useTaskListInEachColumn } from '@/board/taskList/hooks/useTaskListInEachColumn'
import LocalStorageTaskListInEachColumnRepository from '@/board/taskList/state/localStorageTaskLists'
import { TaskListInEachColumnRepository } from '@/board/taskList/models/taskListInEachColumnRepository'

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
