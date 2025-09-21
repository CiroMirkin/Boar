import { SessionType } from '@/auth/contexts/SessionProvider'
import { boardModel, defaultBoard } from '../models/board'
import LocalStorageBoardRepository from '../repository/localstorageBoardRepository'
import { sendForSaveBoard } from './sendForSaveBoard'

interface useSaveBoardParams {
	data: boardModel
	session: SessionType
}

export const useSaveBoard = ({ data, session }: useSaveBoardParams) => {
	const localStorage = new LocalStorageBoardRepository()
	const localBoard = localStorage.getAll()

	const isNotTheLocalBoard = JSON.stringify(data) !== JSON.stringify(localBoard)
	const isNotTheDefaultBoard = JSON.stringify(data) !== JSON.stringify(defaultBoard)
	if (isNotTheDefaultBoard) {
		if (!!session && isNotTheLocalBoard) {
			sendForSaveBoard(data)
		} else {
			localStorage.save(data)
		}
	}
}
