'use server'

import { prisma } from '@/shared/lib/prisma'
import type { UsageHistory } from '@/modules/UsageHistory/model/usageHistory'
import { migrateUsageHistory } from '@/modules/UsageHistory/model/usageHistory'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function getUsageHistory({ boardId }: { boardId: string }): Promise<UsageHistory> {
	await requireBoardAccess(boardId)

	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { usageHistory: true },
	})

	return migrateUsageHistory((board?.usageHistory as unknown as UsageHistory) ?? [])
}
