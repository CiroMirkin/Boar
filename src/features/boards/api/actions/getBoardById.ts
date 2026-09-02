'use server'

import { prisma } from '@/shared/lib/prisma'
import type { boardModel } from '../../model/board'
import { requireAuth } from '@/shared/lib/serverAuth'

export async function getBoardById({ boardId }: { boardId: string }): Promise<boardModel | null> {
	const userId = await requireAuth()
	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { id: true, name: true, userId: true },
	})

	if (!board || board.userId !== userId) return null
	return { id: board.id, name: board.name }
}
