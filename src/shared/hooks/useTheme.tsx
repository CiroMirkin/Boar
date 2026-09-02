import { useContext } from 'react'
import { ThemeContext, type Theme } from '@/shared/preferences/theme'

export const useTheme = (): Theme => {
	const theme = useContext(ThemeContext).theme
	return {
		taskText: theme.taskText || 'text-black',
		columnText: theme.columnText || 'text-black',
		...theme,
	}
}
