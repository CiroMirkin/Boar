'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import type { Notes } from '@/modules/notes/model/notes'

async function requireAuth() {
	const session = await auth()
	if (!session?.user?.id) throw new Error('No autorizado')
	return session.user.id
}

async function requireBoardOwnership(boardId: string, userId: string) {
	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { userId: true },
	})
	if (!board || board.userId !== userId) throw new Error('No autorizado')
}

export async function getNotes({ boardId }: { boardId: string }): Promise<Notes> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const note = await prisma.note.findUnique({ where: { boardId } })
	return note?.content ?? ''
}

export async function saveNotes({
	boardId,
	notes,
}: {
	boardId: string
	notes: Notes
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	await prisma.note.upsert({
		where: { boardId },
		create: { boardId, content: notes },
		update: { content: notes },
	})
}
