'use server'

import { prisma } from '@/lib/prisma'
import type { boardModel } from '@/modules/board/models/board'
import { requireAuth } from '../auth'

export async function getBoardById({ boardId }: { boardId: string }): Promise<boardModel | null> {
	const userId = await requireAuth()
	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { id: true, name: true, userId: true },
	})
	
	if (!board || board.userId !== userId) return null
	return { id: board.id, name: board.name }
}
