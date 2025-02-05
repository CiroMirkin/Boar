import { ReactNode, createContext, useEffect } from 'react'
import { TaskListInEachColumn } from '@/pages/board/models/taskList'
import { useTaskListInEachColumn } from '@/pages/board/columnList/hooks/useTaskListInEachColumn'
import LocalStorageTaskListInEachColumnRepository from '@/repositories/localStorageTaskLists.ts'
import { TaskListInEachColumnRepository } from '@/pages/board/models/taskListInEachColumnRepository'

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
