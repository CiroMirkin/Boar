'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import type { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import type { taskModel } from '@/modules/TaskBoard/model/task'

// ─── Auth helpers ─────────────────────────────────────────────────────────────

async function requireAuth() {
	const session = await auth()
	if (!session?.user?.id) throw new Error('No autorizado')
	return session.user.id
}

async function requireBoardOwnership(boardId: string, userId: string) {
	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: { userId: true },
	})
	if (!board) throw new Error('Tablero no encontrado')
	if (board.userId !== userId) throw new Error('No autorizado')
}

async function requireColumnOwnership(columnId: string, userId: string) {
	const column = await prisma.column.findUnique({
		where: { id: columnId },
		include: { board: { select: { userId: true } } },
	})
	if (!column) throw new Error('Columna no encontrada')
	if (column.board.userId !== userId) throw new Error('No autorizado')
	return column
}

async function requireTaskOwnership(taskId: string, userId: string) {
	const task = await prisma.task.findUnique({
		where: { id: taskId },
		include: { column: { include: { board: { select: { userId: true } } } } },
	})
	if (!task) throw new Error('Tarea no encontrada')
	if (task.column.board.userId !== userId) throw new Error('No autorizado')
	return task
}

// ─── TaskBoard (full board shape) ─────────────────────────────────────────────

/**
 * Returns the board as a TaskBoard (TaskColumn[]) shape expected by the client.
 * Columns are ordered by `order`, tasks by `createdAt`.
 */
export async function getTaskBoard({ boardId }: { boardId: string }): Promise<TaskBoard> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const columns = await prisma.column.findMany({
		where: { boardId },
		orderBy: { order: 'asc' },
		include: {
			tasks: { orderBy: { createdAt: 'asc' } },
		},
	})

	return columns.map((col) => ({
		id: col.id,
		status: col.name,
		tasks: col.tasks.map((t) => ({
			id: t.id,
			descriptionText: t.descriptionText,
			tags: (t.tags as taskModel['tags']) ?? undefined,
			notesAndComments: t.notesAndComments ?? undefined,
			timelineHistory: (t.timelineHistory as taskModel['timelineHistory']) ?? undefined,
		})),
	}))
}

/**
 * Full-sync: upserts all columns and tasks from a TaskBoard snapshot.
 * Columns not in the new snapshot are deleted (cascade deletes their tasks).
 * Tasks not in a column are deleted.
 */
export async function saveTaskBoard({
	boardId,
	taskBoard,
}: {
	boardId: string
	taskBoard: TaskBoard
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	await prisma.$transaction(async (tx) => {
		const incomingColumnIds = taskBoard
			.map((c) => c.id)
			.filter((id) => id && !id.startsWith('c')) // skip default key IDs

		// Upsert columns
		for (let i = 0; i < taskBoard.length; i++) {
			const col = taskBoard[i]
			const isDefaultId = col.id === 'c1' || col.id === 'c2' || col.id === 'c3'

			if (isDefaultId) {
				// These are placeholder IDs from emptyTaskBoard — look up by order
				await tx.column.updateMany({
					where: { boardId, order: i },
					data: { name: col.status, order: i },
				})
			} else {
				await tx.column.upsert({
					where: { id: col.id },
					create: { id: col.id, name: col.status, order: i, boardId },
					update: { name: col.status, order: i },
				})
			}

			// Get the real column id after upsert
			const realCol = isDefaultId
				? await tx.column.findFirst({ where: { boardId, order: i } })
				: { id: col.id }

			if (!realCol) continue

			const incomingTaskIds = col.tasks.map((t) => t.id)

			// Delete tasks removed from this column
			await tx.task.deleteMany({
				where: { columnId: realCol.id, id: { notIn: incomingTaskIds } },
			})

			// Upsert tasks
			for (const task of col.tasks) {
				await tx.task.upsert({
					where: { id: task.id },
					create: {
						id: task.id,
						descriptionText: task.descriptionText,
						columnId: realCol.id,
						tags: (task.tags as object) ?? undefined,
						notesAndComments: task.notesAndComments ?? undefined,
						timelineHistory: (task.timelineHistory as object) ?? undefined,
					},
					update: {
						descriptionText: task.descriptionText,
						columnId: realCol.id,
						tags: (task.tags as object) ?? undefined,
						notesAndComments: task.notesAndComments ?? undefined,
						timelineHistory: (task.timelineHistory as object) ?? undefined,
					},
				})
			}
		}

		// Delete columns that were removed from the board
		if (incomingColumnIds.length > 0) {
			await tx.column.deleteMany({
				where: { boardId, id: { notIn: incomingColumnIds } },
			})
		}
	})
}

// ─── Column actions ───────────────────────────────────────────────────────────

export async function createColumn({
	boardId,
	name,
}: {
	boardId: string
	name: string
}): Promise<string> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const lastColumn = await prisma.column.findFirst({
		where: { boardId },
		orderBy: { order: 'desc' },
		select: { order: true },
	})
	const nextOrder = (lastColumn?.order ?? -1) + 1

	const column = await prisma.column.create({
		data: { name, order: nextOrder, boardId },
	})
	return column.id
}

export async function deleteColumn({ columnId }: { columnId: string }): Promise<void> {
	const userId = await requireAuth()
	await requireColumnOwnership(columnId, userId)
	await prisma.column.delete({ where: { id: columnId } })
}

export async function updateColumnName({
	columnId,
	name,
}: {
	columnId: string
	name: string
}): Promise<void> {
	const userId = await requireAuth()
	await requireColumnOwnership(columnId, userId)
	await prisma.column.update({ where: { id: columnId }, data: { name } })
}

// ─── Task actions ─────────────────────────────────────────────────────────────

export async function createTask({
	columnId,
	descriptionText,
}: {
	columnId: string
	descriptionText: string
}): Promise<string> {
	const userId = await requireAuth()
	await requireColumnOwnership(columnId, userId)

	const task = await prisma.task.create({ data: { descriptionText, columnId } })
	return task.id
}

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
	const userId = await requireAuth()
	await requireTaskOwnership(taskId, userId)

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

export async function deleteTask({ taskId }: { taskId: string }): Promise<void> {
	const userId = await requireAuth()
	await requireTaskOwnership(taskId, userId)
	await prisma.task.delete({ where: { id: taskId } })
}

export async function moveTask({
	taskId,
	toColumnId,
}: {
	taskId: string
	toColumnId: string
}): Promise<void> {
	const userId = await requireAuth()
	await requireTaskOwnership(taskId, userId)
	await requireColumnOwnership(toColumnId, userId)
	await prisma.task.update({ where: { id: taskId }, data: { columnId: toColumnId } })
}
