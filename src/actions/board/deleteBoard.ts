'use server'

import { prisma } from '@/lib/prisma'
import { requireBoardAccess } from '../shared'

export async function deleteBoard({ boardId }: { boardId: string }): Promise<void> {
	await requireBoardAccess(boardId)
	await prisma.board.delete({ where: { id: boardId } })
}
