import { darkTheme, lightTheme, Theme } from "./themesList"

export const useUserSystemTheme = (): Theme => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return darkTheme
    }
    return lightTheme
}