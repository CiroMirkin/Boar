import { Dispatch } from '@reduxjs/toolkit'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { UserBoard } from '../model/UserBoard'

interface SetUserBoardParams {
	dispatch: Dispatch
	savedUserBoard: UserBoard
}

/** Reestablace los datos del tablero dentro de la aplicacion. */
export const setUserBoard = ({ dispatch, savedUserBoard }: SetUserBoardParams) => {
	const { accessories } = savedUserBoard
	// Accessories info
	dispatch(changeActualTagGroup(accessories.actual_tag_group))
}
