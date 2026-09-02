'use server'

import { prisma } from '@/lib/prisma'
import { requireColumnAccess, requireTaskAccess } from '../shared'

export async function moveTask({
	taskId,
	toColumnId,
}: {
	taskId: string
	toColumnId: string
}): Promise<void> {
	await requireTaskAccess(taskId)
	await requireColumnAccess(toColumnId)
	await prisma.task.update({
		where: { id: taskId },
		data: { columnId: toColumnId },
	})
}
