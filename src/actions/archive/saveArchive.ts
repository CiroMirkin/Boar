'use server'

import { prisma } from '@/lib/prisma'
import type { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'
import { requireBoardAccess } from '../shared'

export async function saveArchive({
	boardId,
	taskList,
}: {
	boardId: string
	taskList: Archive
}): Promise<void> {
	await requireBoardAccess(boardId)

	await prisma.archive.upsert({
		where: { boardId },
		create: { boardId, taskList: taskList as object[] },
		update: { taskList: taskList as object[] },
	})
}
