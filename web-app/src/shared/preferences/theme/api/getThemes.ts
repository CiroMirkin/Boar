'use server'

import { prisma } from '@/shared/lib/prisma'
import type { Theme } from '../model/themesList'

/** Catálogo de temas del sistema (no incluye temas de usuario). Ordenado por `order`. */
export async function getThemes(): Promise<Theme[]> {
	const themes = await prisma.theme.findMany({
		where: { userId: null },
		orderBy: { order: 'asc' },
	})

	return themes.map((t) => ({
		id: t.id,
		bg: t.bg,
		task: t.task,
		column: t.column,
		text: t.text,
		taskText: t.taskText ?? undefined,
		columnText: t.columnText ?? undefined,
		reminder: t.reminder ?? undefined,
	}))
}
