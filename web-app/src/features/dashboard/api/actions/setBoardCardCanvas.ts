'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '@/shared/lib/serverAuth'
import { HERO_COUNT } from '../../model/heros'

export async function setBoardCardCanvas({
	boardId,
	index,
}: {
	boardId: string
	index: number
}): Promise<void> {
	await requireBoardAccess(boardId)

	if (!Number.isInteger(index) || index < 0 || index >= HERO_COUNT) {
		throw new Error('Índice de canvas inválido')
	}

	await prisma.board.update({
		where: { id: boardId },
		data: { cardCanvas: index },
	})
}
