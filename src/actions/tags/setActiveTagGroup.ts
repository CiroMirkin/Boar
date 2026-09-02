'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireBoardAccess } from '../shared'

export async function setActiveTagGroup({
	boardId,
	tagGroupId,
}: {
	boardId: string
	tagGroupId: string
}): Promise<void> {
	await requireBoardAccess(boardId)

	if (tagGroupId !== 'none') {
		const tagGroup = await prisma.tagGroup.findUnique({
			where: { id: tagGroupId },
		})

		if (!tagGroup) throw new Error('Grupo de etiquetas no encontrado')
	}

	await prisma.board.update({
		where: { id: boardId },
		data: {
			activeTagGroupId: tagGroupId === 'none' ? null : tagGroupId,
		},
	})
}
