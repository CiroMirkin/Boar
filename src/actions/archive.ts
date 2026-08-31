'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import type { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'
import type { LibraryOfArchivedNotes } from '@/modules/notes/LibraryOfArchiveNotes/model/libraryOfArchivedNotes'

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
	if (!board || board.userId !== userId) throw new Error('No autorizado')
}

// ─── Archived Tasks ───────────────────────────────────────────────────────────

export async function getArchive({ boardId }: { boardId: string }): Promise<Archive> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const archive = await prisma.archive.findUnique({ where: { boardId } })
	return (archive?.taskList as Archive) ?? []
}

export async function saveArchive({
	boardId,
	taskList,
}: {
	boardId: string
	taskList: Archive
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	await prisma.archive.upsert({
		where: { boardId },
		create: { boardId, taskList: taskList as object[] },
		update: { taskList: taskList as object[] },
	})
}

// ─── Archived Notes (Library) ─────────────────────────────────────────────────

export async function getArchivedNotes({
	boardId,
}: {
	boardId: string
}): Promise<LibraryOfArchivedNotes> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const archive = await prisma.archive.findUnique({ where: { boardId } })
	return (archive?.notes as LibraryOfArchivedNotes) ?? { archive: [] }
}

export async function saveArchivedNotes({
	boardId,
	notes,
}: {
	boardId: string
	notes: LibraryOfArchivedNotes
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	await prisma.archive.upsert({
		where: { boardId },
		create: { boardId, notes: notes as object },
		update: { notes: notes as object },
	})
}
