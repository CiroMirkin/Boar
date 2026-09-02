'use server'

import { prisma } from '@/shared/lib/prisma'
import type { UsageHistory } from '../../model/usageHistory'
import { migrateUsageHistory } from '../../model/usageHistory'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function saveUsageHistory({
	boardId,
	history,
}: {
	boardId: string
	history: UsageHistory
}): Promise<UsageHistory> {
	await requireBoardAccess(boardId)

	const updated = await prisma.board.update({
		where: { id: boardId },
		data: { usageHistory: history as object[] },
		select: { usageHistory: true },
	})

	return migrateUsageHistory((updated.usageHistory as unknown as UsageHistory) ?? [])
}
