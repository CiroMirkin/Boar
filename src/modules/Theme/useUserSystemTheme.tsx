import { darkTheme, lightTheme, Theme } from './themesList'

export const useUserSystemTheme = (): Theme => {
	if (typeof window === 'undefined') return lightTheme
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return darkTheme
	}
	return lightTheme
}
