'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '../shared'

export async function createColumn({
	boardId,
	name,
}: {
	boardId: string
	name: string
}): Promise<string> {
	await requireBoardAccess(boardId)

	const lastColumn = await prisma.column.findFirst({
		where: { boardId },
		orderBy: { order: 'desc' },
		select: { order: true },
	})
	const nextOrder = (lastColumn?.order ?? -1) + 1

	const column = await prisma.column.create({
		data: { name, order: nextOrder, boardId },
	})
	return column.id
}
