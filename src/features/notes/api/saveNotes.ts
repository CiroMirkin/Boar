'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Notes } from '../model/notes'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function saveNotes({
	boardId,
	notes,
}: {
	boardId: string
	notes: Notes
}): Promise<void> {
	await requireBoardAccess(boardId)

	await prisma.note.upsert({
		where: { boardId },
		create: { boardId, content: notes },
		update: { content: notes },
	})
}
