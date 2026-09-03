'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useSession } from '@/features/auth'
import { fetchBoard } from '@/features/boards/api/repository/boardRepository'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { darkTheme, lightTheme, type Theme } from '../model/themesList'
import { resolveTheme } from '../model/resolveTheme'
import { useThemesQuery } from './useThemesQuery'
import { useDashboardTheme } from './useDashboardTheme'

// /board/<id> y /settings/<id> muestran el tema de ese tablero; el resto, el del dashboard.
const BOARD_ROUTE = /^\/(?:board|settings)\/([^/]+)/

type ChangeTheme = (value: Theme | ((prev: Theme) => Theme)) => void

/** 
 * Resuelve el tema activo según la ruta y la sesión. 
 * Invitado: `localStorage` (comportamiento actual).
 * Logueado: tema del tablero o del dashboard.
 */
export const useResolvedTheme = (): { theme: Theme; changeTheme: ChangeTheme } => {
	const { session } = useSession()
	const pathname = usePathname()

	// clave 'boar-theme' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage existente
	const [guestTheme, setGuestTheme] = useLocalStorage<Theme>('boar-theme', lightTheme)
	useEffect(() => {
		try {
			if (window.localStorage.getItem('boar-theme') !== null) return
		} catch {
			return
		}
		if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) setGuestTheme(darkTheme)
	}, [setGuestTheme])

	const { themes } = useThemesQuery()
	const { themeId: dashboardThemeId } = useDashboardTheme()

	const boardId = pathname?.match(BOARD_ROUTE)?.[1] ?? ''
	const { data: board } = useQuery({
		queryKey: ['board', session?.user.id, boardId],
		queryFn: () => fetchBoard(session, boardId),
		enabled: !!session && !!boardId,
	})

	if (!session) return { theme: guestTheme, changeTheme: setGuestTheme }

	const activeId = boardId ? board?.themeId : dashboardThemeId
	return { theme: resolveTheme(activeId, themes), changeTheme: () => {} }
}
