import { useContext } from 'react'
import { ThemeContext } from '../../modules/Theme/ThemeContext'
import { Theme } from '@/modules/Theme/themesList'

export const useTheme = (): Theme => {
	const theme = useContext(ThemeContext).theme
	return {
		taskText: theme.taskText || 'text-black',
		columnText: theme.columnText || 'text-black',
		...theme,
	}
}
