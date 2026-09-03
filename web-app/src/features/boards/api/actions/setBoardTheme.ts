'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function setBoardTheme({
	boardId,
	themeId,
}: {
	boardId: string
	themeId: string
}): Promise<void> {
	await requireBoardAccess(boardId)
	// La FK a Theme valida que el id exista.
	await prisma.board.update({
		where: { id: boardId },
		data: { themeId },
	})
}
