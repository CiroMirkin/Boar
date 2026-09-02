import { useContext } from 'react'
import { ThemeContext, type Theme } from '@/shared/preferences/theme'

/** Devuelve el tema activo con `text-black` como fallback para los colores de texto opcionales. */
export const useTheme = (): Theme => {
	const { theme } = useContext(ThemeContext)
	return {
		...theme,
		taskText: theme.taskText ?? 'text-black',
		columnText: theme.columnText ?? 'text-black',
	}
}
