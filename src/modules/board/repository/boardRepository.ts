import { boardModel } from '../models/board'
import LocalStorageBoardRepository from './localstorageBoardRepository'
import NextjsBoardRepository from './nextjsBoardRepository'
import type { SessionType } from '@/auth/contexts/SessionProvider'

export interface BoardRepository {
	save(board: boardModel, boardId: string): Promise<void>
	get(boardId: string): Promise<boardModel>
}

const getBoardRepository = (session: SessionType): BoardRepository => {
	if (session) {
		return new NextjsBoardRepository()
	}
	return new LocalStorageBoardRepository()
}

export const fetchBoard = async (session: SessionType, boardId: string): Promise<boardModel> => {
	const repository = getBoardRepository(session)
	return repository.get(boardId)
}

export const saveBoard = async ({
	board,
	session,
	boardId,
}: {
	board: boardModel
	session: SessionType
	boardId: string
}): Promise<void> => {
	const repository = getBoardRepository(session)
	await repository.save(board, boardId)
}
