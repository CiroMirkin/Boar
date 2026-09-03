import { Theme, lightTheme } from './themesList'

/** Devuelve el objeto `Theme` para un `id`, con fallback a `lightTheme` si no existe. */
export const resolveTheme = (id: string | null | undefined, list: readonly Theme[]): Theme =>
	list.find((theme) => theme.id === id) ?? lightTheme
