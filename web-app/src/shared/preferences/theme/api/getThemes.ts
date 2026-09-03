'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Theme } from '../model/themesList'

/** Catálogo de temas del sistema (no incluye temas de usuario). Ordenado por `order`. */
export async function getThemes(): Promise<Theme[]> {
	const themes = await prisma.theme.findMany({
		where: { userId: null },
		orderBy: { order: 'asc' },
		select: {
			id: true,
			bg: true,
			task: true,
			column: true,
			text: true,
			taskText: true,
			columnText: true,
			reminder: true,
		},
	})

	// Prisma devuelve `null` en los opcionales; `Theme` los quiere `undefined`.
	return themes.map((t) => ({
		...t,
		taskText: t.taskText ?? undefined,
		columnText: t.columnText ?? undefined,
		reminder: t.reminder ?? undefined,
	}))
}
