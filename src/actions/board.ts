'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import type { boardModel } from '@/modules/board/models/board'
import type { Board } from '@/modules/Dashboard/model/board'
import i18next from '@/i18next/server'

// Default column names stored as i18n keys (same as emptyTaskBoard)
const DEFAULT_COLUMN_KEYS = [
	{ key: 'c1', order: 0 },
	{ key: 'c2', order: 1 },
	{ key: 'c3', order: 2 },
]

// ─── Auth helper ─────────────────────────────────────────────────────────────

async function requireAuth() {
	const session = await auth()
	if (!session?.user?.id) throw new Error('No autorizado')
	return session.user.id
}

async function requireBoardOwnership(boardId: string, userId: string) {
	const board = await prisma.board.findUnique({ where: { id: boardId } })
	if (!board) throw new Error('Tablero no encontrado')
	if (board.userId !== userId) throw new Error('No autorizado')
	return board
}

// ─── Board (single board) ────────────────────────────────────────────────────

export async function getBoardById({ boardId }: { boardId: string }): Promise<boardModel | null> {
	const userId = await requireAuth()
	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { id: true, name: true, userId: true },
	})
	if (!board || board.userId !== userId) return null
	return { id: board.id, name: board.name }
}

export async function updateBoardName({
	boardId,
	name,
}: {
	boardId: string
	name: string
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	if (!name.trim()) throw new Error('El tablero debe tener un nombre.')
	if (name.length >= 30) throw new Error('El nombre es demasiado largo.')

	await prisma.board.update({ where: { id: boardId }, data: { name } })
}

// ─── Dashboard (board list) ──────────────────────────────────────────────────

export async function getBoards(): Promise<Board[]> {
	const userId = await requireAuth()
	const boards = await prisma.board.findMany({
		where: { userId },
		orderBy: { createdAt: 'asc' },
		select: { id: true, name: true, createdAt: true },
	})
	return boards.map((b) => ({ id: b.id, name: b.name, date: b.createdAt }))
}

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

		// Create default columns
		await tx.column.createMany({
			data: DEFAULT_COLUMN_KEYS.map((col) => ({
				name: col.key, // stored as i18n key, translated on client
				order: col.order,
				boardId: board.id,
			})),
		})

		// Create board accessories
		await tx.note.create({ data: { boardId: board.id, content: '' } })
		await tx.reminder.create({ data: { boardId: board.id, data: {} } })
		await tx.archive.create({ data: { boardId: board.id } })
	})
}

export async function deleteBoard({ boardId }: { boardId: string }): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)
	// Cascade deletes columns, tasks, note, reminder, archive
	await prisma.board.delete({ where: { id: boardId } })
}

// ─── Reminders ───────────────────────────────────────────────────────────────

import type { Reminder } from '@/modules/TaskBoard/components/Reminder/model/reminder'
import type { UsageHistory } from '@/modules/UsageHistory/model/usageHistory'
import { migrateUsageHistory } from '@/modules/UsageHistory/model/usageHistory'

export async function getReminders({ boardId }: { boardId: string }): Promise<Reminder> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const reminder = await prisma.reminder.findUnique({ where: { boardId } })
	const data = reminder?.data as Reminder | null
	return data ?? { columnPosition: '', text: '' }
}

export async function saveReminders({
	boardId,
	reminders,
}: {
	boardId: string
	reminders: Reminder
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	await prisma.reminder.upsert({
		where: { boardId },
		create: { boardId, data: reminders as object },
		update: { data: reminders as object },
	})
}

// ─── UsageHistory ─────────────────────────────────────────────────────────────

export async function getUsageHistory({ boardId }: { boardId: string }): Promise<UsageHistory> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { usageHistory: true },
	})

	return migrateUsageHistory((board?.usageHistory as unknown as UsageHistory) ?? [])
}

export async function saveUsageHistory({
	boardId,
	history,
}: {
	boardId: string
	history: UsageHistory
}): Promise<UsageHistory> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const updated = await prisma.board.update({
		where: { id: boardId },
		data: { usageHistory: history as object[] },
		select: { usageHistory: true },
	})

	return migrateUsageHistory((updated.usageHistory as unknown as UsageHistory) ?? [])
}
