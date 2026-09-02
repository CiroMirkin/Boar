'use server'

import { prisma } from '@/shared/lib/prisma'
import type { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function saveArchivedNotes({
	boardId,
	notes,
}: {
	boardId: string
	notes: LibraryOfArchivedNotes
}): Promise<void> {
	await requireBoardAccess(boardId)

	await prisma.archive.upsert({
		where: { boardId },
		create: { boardId, notes: notes as object },
		update: { notes: notes as object },
	})
}
