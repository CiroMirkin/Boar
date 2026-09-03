'use server'

import { prisma } from '@/shared/lib/prisma'
import i18next from '@/shared/i18n/server'
import { requireAuth } from '@/shared/lib/serverAuth'
import { DEFAULT_COLUMN_IDS } from '@/features/tasks/model/taskBoard'

export async function createBoard({ name }: { name: string }): Promise<void> {
	const userId = await requireAuth()

	if (!name.trim()) throw new Error(i18next.t('dashboard.board_name_required'))
	if (name.length <= 2 || name.length >= 15)
		throw new Error(i18next.t('dashboard.board_name_length_error'))

	const MAX_BOARDS = 5
	const count = await prisma.board.count({ where: { userId } })
	if (count >= MAX_BOARDS) throw new Error(i18next.t('dashboard.board_limit_error'))

	await prisma.$transaction(async (tx) => {
		const board = await tx.board.create({
			data: { name, userId },
		})

		// Create default columns — el nombre se guarda como clave i18n, se traduce en el cliente
		await tx.column.createMany({
			data: DEFAULT_COLUMN_IDS.map((key, order) => ({
				name: key,
				order,
				boardId: board.id,
			})),
		})

		// Create board accessories
		await tx.note.create({ data: { boardId: board.id, content: '' } })
		await tx.reminder.create({
			data: { boardId: board.id, data: { columnPosition: '', text: '' } },
		})
		await tx.archive.create({ data: { boardId: board.id } })
	})
}
