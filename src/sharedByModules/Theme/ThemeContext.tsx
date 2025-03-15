import { createContext, Dispatch, SetStateAction, useContext } from "react"
import { Theme, lightTheme } from "./themesList"

interface ThemeContextContent {
    theme: Theme
    changeTheme: Dispatch<SetStateAction<Theme>>
}

const defaultThemeContextValue: ThemeContextContent = {
    theme: lightTheme,
    changeTheme: () => {}
}

const ThemeContext = createContext(defaultThemeContextValue)
export const useTheme = () => useContext(ThemeContext).theme
export const useChangeTheme = () => useContext(ThemeContext).changeTheme

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