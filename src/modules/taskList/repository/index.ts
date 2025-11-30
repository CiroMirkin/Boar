import { Session } from '@supabase/supabase-js'
import { TaskBoard } from '../models/taskBoard'
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

export const fetchTaskListInEachColumn = async (session: Session | null): Promise<TaskBoard> => {
	const repository = getTaskListInEachColumnRepository(session)
	return repository.getAll()
}

export const saveTaskListInEachColumn = async ({
	taskListInEachColumn,
	session,
}: {
	taskListInEachColumn: TaskBoard
	session: Session | null
}): Promise<void> => {
	const repository = getTaskListInEachColumnRepository(session)
	await repository.save(taskListInEachColumn)
}
