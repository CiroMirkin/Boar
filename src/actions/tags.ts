'use server'

import { auth } from '../../auth'
import { prisma } from '@/lib/prisma'
import {
	defaultAvialableTags,
	emptyTagGroup,
	type TagGroup,
	type AvailableTags,
} from '@/modules/TaskBoard/components/taskList/components/Tags/model/tags'

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

export async function getActiveTagGroup({
	boardId,
}: {
	boardId: string
}): Promise<{ actualTagGroup: TagGroup; tags: AvailableTags }> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	const board = await prisma.board.findUnique({
		where: { id: boardId },
		select: {
			activeTagGroup: { select: { id: true, tags: true } },
		},
	})

	const availableTagGroups = await prisma.tagGroup.findMany({
		select: { id: true, tags: true },
	})

	const tags: AvailableTags =
		availableTagGroups.length > 0
			? availableTagGroups.map((g) => ({
					id: g.id,
					tags: g.tags as TagGroup['tags'],
				}))
			: defaultAvialableTags

	if (board?.activeTagGroup) {
		return {
			actualTagGroup: {
				id: board.activeTagGroup.id,
				tags: board.activeTagGroup.tags as TagGroup['tags'],
			},
			tags,
		}
	}

	return { actualTagGroup: emptyTagGroup, tags }
}

export async function setActiveTagGroup({
	boardId,
	tagGroupId,
}: {
	boardId: string
	tagGroupId: string
}): Promise<void> {
	const userId = await requireAuth()
	await requireBoardOwnership(boardId, userId)

	if (tagGroupId !== 'none') {
		const tagGroup = await prisma.tagGroup.findUnique({ where: { id: tagGroupId } })
		if (!tagGroup) throw new Error('Grupo de etiquetas no encontrado')
	}

	await prisma.board.update({
		where: { id: boardId },
		data: { activeTagGroupId: tagGroupId === 'none' ? null : tagGroupId },
	})
}

export async function getAvailableTagGroups(): Promise<AvailableTags> {
	const groups = await prisma.tagGroup.findMany()
	if (groups.length === 0) return defaultAvialableTags
	return groups.map((g) => ({
		id: g.id,
		tags: g.tags as TagGroup['tags'],
	}))
}
