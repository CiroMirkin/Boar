import { Session } from '@supabase/supabase-js'
import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import { TaskListInEachColumnRepository } from './taskListInEachColumnRepository'
import LocalStorageTaskListInEachColumnRepository from './localStorageTaskListsRepository'
import SupabaseTaskListInEachColumnRepository from './supabaseTaskListsRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

// Factory para obtener el repositorio adecuado segun el estado del usuario
const getTaskBoardRepository = (session: Session | null): TaskListInEachColumnRepository => {
	if (session) {
		return new SupabaseTaskListInEachColumnRepository()
	}
	return new LocalStorageTaskListInEachColumnRepository()
}

export const fetchTaskBoard = async (session: Session | null): Promise<TaskBoard> => {
	const repository = getTaskBoardRepository(session)
	const boardId = getActualBoardId()
	return repository.getAll(boardId)
}

export const saveTaskBoard = async ({
	taskBoard,
	session,
}: {
	taskBoard: TaskBoard
	session: Session | null
}): Promise<void> => {
	const repository = getTaskBoardRepository(session)
	const boardId = getActualBoardId()
	await repository.save(taskBoard, boardId)
}
