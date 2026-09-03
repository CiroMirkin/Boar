'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/features/auth'

export const dashboardThemeKey = (userId?: string) => ['dashboard-theme', userId]

/** Id del tema del dashboard del usuario logueado. `'retro'` mientras carga o sin sesión. */
export const useDashboardTheme = () => {
	const { session } = useSession()
	const userId = session?.user.id

	const { data: themeId = 'retro' } = useQuery({
		queryKey: dashboardThemeKey(userId),
		queryFn: async () => {
			const { getDashboardTheme } = await import('../api/dashboardTheme')
			return getDashboardTheme()
		},
		enabled: !!session,
	})

	return { themeId }
}
