import { createContext, Dispatch, SetStateAction } from "react"
import { ColorTheme, defaultColorTheme } from "../configs/colors"

interface ThemeContextContent {
    theme: ColorTheme
    changeTheme: Dispatch<SetStateAction<ColorTheme>>
}

const defaultThemeContextValue: ThemeContextContent = {
    theme: defaultColorTheme,
    changeTheme: () => {}
}

export const ThemeContext = createContext(defaultThemeContextValue)

interface ThemeProviderProps { 
    children: React.ReactNode, 
    // value and dispatch of a useState Hook 
    theme: ColorTheme ,
    changeTheme: Dispatch<SetStateAction<ColorTheme>>
}

export const ThemeProvider = ({ children, theme, changeTheme }: ThemeProviderProps) => {
    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            { children }
        </ThemeContext.Provider>
    )
} 