import { boardModel } from '../models/board'
import LocalStorageBoardRepository from './localstorageBoardRepository'
import SupabaseBoardRepository from './supabaseBoardRepository'
import { Session } from '@supabase/supabase-js'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

export interface BoardRepository {
	save(board: boardModel, boardId: string): Promise<void>
	get(boardId: string): Promise<boardModel>
}

// Factory para obtener el repositorio correcto
const getBoardRepository = (session: Session | null): BoardRepository => {
	if (session) {
		return new SupabaseBoardRepository()
	}
	return new LocalStorageBoardRepository()
}

// Funciones que usarán los hooks de React Query
export const fetchBoard = async (session: Session | null): Promise<boardModel> => {
	const repository = getBoardRepository(session)
	const boardId = getActualBoardId()
	return repository.get(boardId)
}

export const saveBoard = async ({
	board,
	session,
}: {
	board: boardModel
	session: Session | null
}): Promise<void> => {
	const repository = getBoardRepository(session)
	const boardId = getActualBoardId()
	await repository.save(board, boardId)
}
