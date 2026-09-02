'use server'

import { prisma } from '@/lib/prisma'
import {
	defaultAvialableTags,
	emptyTagGroup,
	type TagGroup,
	type AvailableTags,
} from '@/modules/TaskBoard/components/taskList/components/Tags/model/tags'
import { requireBoardAccess } from '../shared'

export async function getActiveTagGroup({
	boardId,
}: {
	boardId: string
}): Promise<{ actualTagGroup: TagGroup; tags: AvailableTags }> {
	await requireBoardAccess(boardId)

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
					tags: g.tags as unknown as TagGroup['tags'],
				}))
			: defaultAvialableTags

	if (board?.activeTagGroup) {
		return {
			actualTagGroup: {
				id: board.activeTagGroup.id,
				tags: board.activeTagGroup.tags as unknown as TagGroup['tags'],
			},
			tags,
		}
	}

	return { actualTagGroup: emptyTagGroup, tags }
}
