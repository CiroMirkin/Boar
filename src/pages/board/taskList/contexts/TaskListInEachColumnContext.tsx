import { ReactNode, createContext, useEffect } from 'react'
import { TaskListInEachColumn } from '@/pages/board/taskList/models/taskList'
import { useTaskListInEachColumn } from '@/pages/board/taskList/hooks/useTaskListInEachColumn'
import LocalStorageTaskListInEachColumnRepository from '@/pages/board/taskList/state/localStorageTaskLists'
import { TaskListInEachColumnRepository } from '@/pages/board/taskList/models/taskListInEachColumnRepository'

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
