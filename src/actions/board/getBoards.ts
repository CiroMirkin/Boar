'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Board } from '@/modules/Dashboard/model/board'
import { requireAuth } from '../auth'

export async function getBoards(): Promise<Board[]> {
	const userId = await requireAuth()
	const boards = await prisma.board.findMany({
		where: { userId },
		orderBy: { createdAt: 'asc' },
		select: { id: true, name: true, createdAt: true },
	})

	return boards.map((b) => ({
		id: b.id,
		name: b.name,
		date: b.createdAt,
	}))
}
