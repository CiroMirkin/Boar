'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireColumnAccess } from '@/shared/lib/serverAuth'

export async function createTask({
	columnId,
	descriptionText,
}: {
	columnId: string
	descriptionText: string
}): Promise<string> {
	await requireColumnAccess(columnId)

	const task = await prisma.task.create({
		data: { descriptionText, columnId },
	})
	return task.id
}
