import { isDefaultBoardName } from '@/modules/board/models/board'
import { defaultNotes } from '@/modules/notes/model/notes'
import { getActualUserBoard } from './getActualUserBoard'
import { emptyTaskBoard } from '@/modules/TaskBoard/model/taskBoard'

/**
 * Verifica los valores dentro del estado local (Redux).
 * @returns True si el usuario tiene el tablero por defecto (vacio)
 */
export const checkIfUserHasTheDefaultBoard = async (): Promise<boolean> => {
	const { board: actualUserBoard, accessories: actualUserBoardAccessories } =
		await getActualUserBoard()
	return (
		isDefaultBoardName(actualUserBoard.name) &&
		JSON.stringify(actualUserBoard.task_list_in_each_column) ===
			JSON.stringify(emptyTaskBoard) &&
		actualUserBoardAccessories.notes === defaultNotes
	)
}
