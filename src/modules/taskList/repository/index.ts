import { Session } from '@supabase/supabase-js'
import { TaskListInEachColumn } from '../models/taskList'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import LocalStorageTaskListInEachColumnRepository from './localStorageTaskListsRepository'
import SupabaseTaskListInEachColumnRepository from './supabaseTaskListsRepository'

// Factory para obtener el repositorio adecuado segun el estado del usuario
const getTaskListInEachColumnRepository = (
	session: Session | null
): TaskListInEachColumnRepository => {
	if (session) {
		return new SupabaseTaskListInEachColumnRepository()
	}
	return new LocalStorageTaskListInEachColumnRepository()
}

export const fetchTaskListInEachColumn = async (
	session: Session | null
): Promise<TaskListInEachColumn> => {
	const repository = getTaskListInEachColumnRepository(session)
	return repository.getAll()
}

export const saveTaskListInEachColumn = async ({
	taskListInEachColumn,
	session,
}: {
	taskListInEachColumn: TaskListInEachColumn
	session: Session | null
}): Promise<void> => {
	const repository = getTaskListInEachColumnRepository(session)
	await repository.save(taskListInEachColumn)
}
