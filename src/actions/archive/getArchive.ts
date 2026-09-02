'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function getArchive({ boardId }: { boardId: string }): Promise<Archive> {
	await requireBoardAccess(boardId)

	const archive = await prisma.archive.findUnique({
		where: { boardId },
	})
	return (archive?.taskList as unknown as Archive) ?? []
}
