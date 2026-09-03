'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/features/auth'
import { themesList, type Theme } from '../model/themesList'

/** Catálogo para el selector: con sesión lee `Theme` de la DB; sin sesión usa el
 * fallback estático de invitado. Siempre resuelve algo. */
export const useThemesQuery = () => {
	const { session } = useSession()

	const { data: themes = themesList as Theme[] } = useQuery({
		queryKey: ['themes', !!session],
		queryFn: async (): Promise<Theme[]> => {
			if (!session) return themesList as Theme[]
			const { getThemes } = await import('../api/getThemes')
			return getThemes()
		},
		staleTime: Infinity,
	})

	return { themes }
}
