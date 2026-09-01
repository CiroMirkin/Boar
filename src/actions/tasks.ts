'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import type { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'
import type { taskModel } from '@/modules/TaskBoard/model/task'

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
			tags: (t.tags as unknown as taskModel['tags']) ?? undefined,
			notesAndComments: t.notesAndComments ?? undefined,
			timelineHistory:
				(t.timelineHistory as unknown as taskModel['timelineHistory']) ?? undefined,
		})),
	}))
}

// Placeholder column IDs from emptyTaskBoard — resolved to real rows by position.
const DEFAULT_COLUMN_IDS = ['c1', 'c2', 'c3']

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
		// Reject client-supplied IDs that belong to another user's board.
		const incomingColumnIds = taskBoard
			.map((c) => c.id)
			.filter((id) => id && !DEFAULT_COLUMN_IDS.includes(id))
		const incomingTaskIds = taskBoard.flatMap((c) => c.tasks.map((t) => t.id)).filter(Boolean)

		const foreignColumn = await tx.column.findFirst({
			where: { id: { in: incomingColumnIds }, boardId: { not: boardId } },
			select: { id: true },
		})
		const foreignTask = await tx.task.findFirst({
			where: { id: { in: incomingTaskIds }, column: { boardId: { not: boardId } } },
			select: { id: true },
		})
		if (foreignColumn || foreignTask) throw new Error('No autorizado')

		// Upsert columns and their tasks, tracking the real column IDs we keep.
		const persistedColumnIds: string[] = []

		for (let i = 0; i < taskBoard.length; i++) {
			const col = taskBoard[i]

			let realColumnId: string
			if (DEFAULT_COLUMN_IDS.includes(col.id)) {
				// Placeholder ID from emptyTaskBoard — match the existing column by position.
				const existing = await tx.column.findFirst({ where: { boardId, order: i } })
				if (existing) {
					await tx.column.update({
						where: { id: existing.id },
						data: { name: col.status, order: i },
					})
					realColumnId = existing.id
				} else {
					const created = await tx.column.create({
						data: { name: col.status, order: i, boardId },
					})
					realColumnId = created.id
				}
			} else {
				await tx.column.upsert({
					where: { id: col.id },
					create: { id: col.id, name: col.status, order: i, boardId },
					update: { name: col.status, order: i },
				})
				realColumnId = col.id
			}
			persistedColumnIds.push(realColumnId)

			const columnTaskIds = col.tasks.map((t) => t.id)

			// Delete tasks removed from this column
			await tx.task.deleteMany({
				where: { columnId: realColumnId, id: { notIn: columnTaskIds } },
			})

			// Upsert tasks
			for (const task of col.tasks) {
				await tx.task.upsert({
					where: { id: task.id },
					create: {
						id: task.id,
						descriptionText: task.descriptionText,
						columnId: realColumnId,
						tags: (task.tags as object) ?? undefined,
						notesAndComments: task.notesAndComments ?? undefined,
						timelineHistory: (task.timelineHistory as object) ?? undefined,
					},
					update: {
						descriptionText: task.descriptionText,
						columnId: realColumnId,
						tags: (task.tags as object) ?? undefined,
						notesAndComments: task.notesAndComments ?? undefined,
						timelineHistory: (task.timelineHistory as object) ?? undefined,
					},
				})
			}
		}

		// Delete columns that were removed from the board (cascade deletes their tasks).
		await tx.column.deleteMany({
			where: { boardId, id: { notIn: persistedColumnIds } },
		})
	})
}

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
