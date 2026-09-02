'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireTaskAccess } from '../shared'

export async function deleteTask({ taskId }: { taskId: string }): Promise<void> {
	await requireTaskAccess(taskId)
	await prisma.task.delete({ where: { id: taskId } })
}
