import { defaultBoard } from '@/modules/board/models/board'

type BoardId = string

/**
 * Optiene el board_id directamente de la URL.
 * @description Esta funcion cuenta con que la URL sea:
 * > board_domain/board/{board_id}
 * @returns { string } Si no encuentra un id en la URL retorna el id del tablero por defecto.
 * */
export const getActualBoardId = (): BoardId => {
	const { pathname } = window.location

	const board_id = pathname.split('/')[2]
	return board_id || defaultBoard.id
}
