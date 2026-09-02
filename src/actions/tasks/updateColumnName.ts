'use server'

import { prisma } from '@/lib/prisma'
import { requireColumnAccess } from '../shared'

export async function updateColumnName({
	columnId,
	name,
}: {
	columnId: string
	name: string
}): Promise<void> {
	await requireColumnAccess(columnId)
	await prisma.column.update({
		where: { id: columnId },
		data: { name },
	})
}
