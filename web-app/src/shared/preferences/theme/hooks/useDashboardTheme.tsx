'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/features/auth'

export const dashboardThemeKey = (userId?: string) => ['dashboard-theme', userId]

/** 
 * @returns Id del tema del dashboard del usuario logueado. 
 * @default 'retro' es el Id mientras carga y por defecto.
 * */
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
