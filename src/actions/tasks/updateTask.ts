'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireTaskAccess } from '@/shared/lib/serverAuth'

export async function updateTask({
	taskId,
	descriptionText,
	notesAndComments,
	tags,
	timelineHistory,
}: {
	taskId: string
	descriptionText?: string
	notesAndComments?: string
	tags?: object
	timelineHistory?: object
}): Promise<void> {
	await requireTaskAccess(taskId)

	await prisma.task.update({
		where: { id: taskId },
		data: {
			...(descriptionText !== undefined && { descriptionText }),
			...(notesAndComments !== undefined && { notesAndComments }),
			...(tags !== undefined && { tags }),
			...(timelineHistory !== undefined && { timelineHistory }),
		},
	})
}
