'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBoardId } from './store'

/**
 * Mantiene el store global `boardId` en sync con el parámetro `/:id` de la ruta.
 *
 * Las páginas de tablero lo obtienen gratis vía `useBoardQuery`, pero las páginas
 * board-scoped que no montan ese hook (archivo, registro de uso) deben llamar a
 * esto para que sus queries sepan a qué tablero pegarle en una carga directa.
 */
export function useSyncBoardIdFromRoute() {
	const params = useParams<{ id?: string }>()
	const setBoardId = useBoardId((s) => s.setBoardId)

	useEffect(() => {
		if (params?.id) setBoardId(params.id)
	}, [params?.id, setBoardId])
}
