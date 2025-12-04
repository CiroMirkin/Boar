import { Session } from '@supabase/supabase-js'
import { TaskBoard } from '../../TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import LocalStorageTaskListInEachColumnRepository from './localStorageTaskListsRepository'
import SupabaseTaskListInEachColumnRepository from './supabaseTaskListsRepository'

// Factory para obtener el repositorio adecuado segun el estado del usuario
const getTaskBoardRepository = (session: Session | null): TaskListInEachColumnRepository => {
	if (session) {
		return new SupabaseTaskListInEachColumnRepository()
	}
	return new LocalStorageTaskListInEachColumnRepository()
}

export const fetchTaskBoard = async (session: Session | null): Promise<TaskBoard> => {
	const repository = getTaskBoardRepository(session)
	return repository.getAll()
}

export const saveTaskBoard = async ({
	taskBoard,
	session,
}: {
	taskBoard: TaskBoard
	session: Session | null
}): Promise<void> => {
	const repository = getTaskBoardRepository(session)
	await repository.save(taskBoard)
}
