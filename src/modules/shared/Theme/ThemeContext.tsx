import { createContext, Dispatch, SetStateAction } from "react"
import { Theme, defaultTheme } from "./themesList"

interface ThemeContextContent {
    theme: Theme
    changeTheme: Dispatch<SetStateAction<Theme>>
}

const defaultThemeContextValue: ThemeContextContent = {
    theme: defaultTheme,
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