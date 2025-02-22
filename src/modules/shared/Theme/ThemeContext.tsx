import { createContext, Dispatch, SetStateAction } from "react"
import { Theme, defaultColorTheme } from "./colors"

interface ThemeContextContent {
    theme: Theme
    changeTheme: Dispatch<SetStateAction<Theme>>
}

const defaultThemeContextValue: ThemeContextContent = {
    theme: defaultColorTheme,
    changeTheme: () => {}
}

export const ThemeContext = createContext(defaultThemeContextValue)

interface ThemeProviderProps { 
    children: React.ReactNode, 
    // value and dispatch of a useState Hook 
    theme: Theme ,
    changeTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeProvider = ({ children, theme, changeTheme }: ThemeProviderProps) => {
    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            { children }
        </ThemeContext.Provider>
    )
} 