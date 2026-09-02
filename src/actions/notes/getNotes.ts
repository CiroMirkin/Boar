'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Notes } from '@/modules/notes/model/notes'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function getNotes({ boardId }: { boardId: string }): Promise<Notes> {
	await requireBoardAccess(boardId)

	const note = await prisma.note.findUnique({
		where: { boardId },
	})
	return note?.content ?? ''
}
