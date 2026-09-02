'use server'

import { prisma } from '@/shared/lib/prisma'
import type { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

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
