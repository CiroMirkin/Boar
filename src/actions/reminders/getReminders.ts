'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Reminder } from '@/modules/TaskBoard/components/Reminder/model/reminder'
import { requireBoardAccess } from '@/shared/lib/serverAuth'

export async function getReminders({ boardId }: { boardId: string }): Promise<Reminder> {
	await requireBoardAccess(boardId)

	const reminder = await prisma.reminder.findUnique({
		where: { boardId },
	})
	/* 
	`data` puede ser `{}` (así lo siembra un board nuevo) o parcial:
	normalizar siempre a la forma completa para no romper los inputs controlados del cliente.
	*/
	const data = (reminder?.data ?? {}) as Partial<Reminder>
	return {
		columnPosition: data.columnPosition ?? '',
		text: data.text ?? '',
	}
}
