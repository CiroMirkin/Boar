import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export const useChangeTheme = () => useContext(ThemeContext).changeTheme
