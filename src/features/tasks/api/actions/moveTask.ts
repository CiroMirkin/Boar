'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireColumnAccess, requireTaskAccess } from '@/shared/lib/serverAuth'

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
