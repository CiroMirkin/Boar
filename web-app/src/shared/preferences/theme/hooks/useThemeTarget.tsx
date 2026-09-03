'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession, useBoardId } from '@/features/auth'
import { boardKey } from '@/features/boards/hooks/useBoardQuery'
import { useChangeTheme } from './useChangeTheme'
import { useThemesQuery } from './useThemesQuery'
import { resolveTheme } from '../model/resolveTheme'
import { dashboardThemeKey } from './useDashboardTheme'

type Target = 'board' | 'dashboard'

/** Devuelve el setter de tema para el destino correcto. Invitado: `localStorage`
 * global. Logueado: mutación optimista contra el tablero o el dashboard. */
export const useThemeTarget = (target: Target) => {
	const { session } = useSession()
	const userId = session?.user.id
	const boardId = useBoardId((s) => s.board_id)
	const queryClient = useQueryClient()
	const changeGuestTheme = useChangeTheme()
	const { themes } = useThemesQuery()

	const key = target === 'board' ? boardKey(userId, boardId) : dashboardThemeKey(userId)

	const { mutate } = useMutation({
		mutationFn: async (themeId: string) => {
			if (target === 'board') {
				const { setBoardTheme } = await import(
					'@/features/boards/api/actions/setBoardTheme'
				)
				await setBoardTheme({ boardId, themeId })
			} else {
				const { setDashboardTheme } = await import('../api/dashboardTheme')
				await setDashboardTheme(themeId)
			}
		},
		// Optimista sin rollback: un save fallido se auto-corrige al invalidar en onSettled.
		onMutate: (themeId: string) => {
			if (target === 'board') {
				queryClient.setQueryData(key, (old: Record<string, unknown> | undefined) =>
					old ? { ...old, themeId } : old
				)
			} else {
				queryClient.setQueryData(key, themeId)
			}
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
	})

	const setTheme = (themeId: string) => {
		if (!session) {
			changeGuestTheme(resolveTheme(themeId, themes))
			return
		}
		mutate(themeId)
	}

	return { setTheme }
}
