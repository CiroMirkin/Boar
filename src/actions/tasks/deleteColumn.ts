'use server'

import { prisma } from '@/lib/prisma'
import { requireColumnAccess } from '../shared'

export async function deleteColumn({ columnId }: { columnId: string }): Promise<void> {
	await requireColumnAccess(columnId)
	await prisma.column.delete({ where: { id: columnId } })
}
