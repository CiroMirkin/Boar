'use server'

import { prisma } from '@/shared/lib/prisma'
import { requireAuth } from '@/shared/lib/serverAuth'

export async function getDashboardTheme(): Promise<string> {
	const userId = await requireAuth()
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { dashboardThemeId: true },
	})
	return user?.dashboardThemeId ?? 'retro'
}

export async function setDashboardTheme(themeId: string): Promise<void> {
	const userId = await requireAuth()
	// La FK a Theme valida que el id exista.
	await prisma.user.update({ where: { id: userId }, data: { dashboardThemeId: themeId } })
}
