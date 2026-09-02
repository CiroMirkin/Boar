'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Reminder } from '@/modules/TaskBoard/components/Reminder/model/reminder'
import { requireBoardAccess } from '../shared'

export async function saveReminders({
	boardId,
	reminders,
}: {
	boardId: string
	reminders: Reminder
}): Promise<void> {
	await requireBoardAccess(boardId)

	await prisma.reminder.upsert({
		where: { boardId },
		create: { boardId, data: reminders as object },
		update: { data: reminders as object },
	})
}
