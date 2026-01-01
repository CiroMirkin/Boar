type BoardId = string

/**
 * Obtiene el board_id directamente de la URL.
 * @description Esta funcion asume que la URL es:
 * > board_domain/{something}/{board_id}
 * @returns { string } Si no encuentra un id en la URL retorna un string vacio.
 * */
export const getActualBoardId = (): BoardId => {
	const { pathname } = window.location

	const board_id = pathname.split('/')[2]
	return board_id ?? ''
}
