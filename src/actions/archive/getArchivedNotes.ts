'use server'

import { prisma } from '@/lib/prisma'
import type { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'
import { requireBoardAccess } from '../shared'

export async function getArchivedNotes({
	boardId,
}: {
	boardId: string
}): Promise<LibraryOfArchivedNotes> {
	await requireBoardAccess(boardId)

	const archive = await prisma.archive.findUnique({
		where: { boardId },
	})
	return (archive?.notes as unknown as LibraryOfArchivedNotes) ?? { archive: [] }
}
