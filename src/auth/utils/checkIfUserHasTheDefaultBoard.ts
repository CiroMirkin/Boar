import { isDefaultBoard } from '@/modules/board/models/board'
import { isDefaultColumnList } from '@/modules/columnList/models/columnList'
import { defaultNotes } from '@/modules/notes/model/notes'
import { emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { getActualUserBoard } from './getActualUserBoard'

/**
 * Verifica los valores dentro del estado local (Redux).
 * @returns True si el usuario tiene el tablero por defecto (vacio)
 */
export const checkIfUserHasTheDefaultBoard = async (): Promise<boolean> => {
	const { board: actualUserBoard, accessories: actualUserBoardAccessories } =
		await getActualUserBoard()
	return (
		isDefaultBoard(actualUserBoard) &&
		isDefaultColumnList(actualUserBoard.column_list) &&
		JSON.stringify(actualUserBoard.task_list_in_each_column) ===
			JSON.stringify(emptyTaskListInEachColumn) &&
		actualUserBoardAccessories.notes === defaultNotes
	)
}
