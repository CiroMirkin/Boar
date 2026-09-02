'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function deleteBoard({ boardId }: { boardId: string }): Promise<void> {
	await requireBoardAccess(boardId)
	await prisma.board.delete({ where: { id: boardId } })
}
