'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '../shared'

export async function updateBoardName({
	boardId,
	name,
}: {
	boardId: string
	name: string
}): Promise<void> {
	await requireBoardAccess(boardId)

	if (!name.trim()) throw new Error('El tablero debe tener un nombre.')
	if (name.length >= 30) throw new Error('El nombre es demasiado largo.')

	await prisma.board.update({
		where: { id: boardId },
		data: { name },
	})
}
