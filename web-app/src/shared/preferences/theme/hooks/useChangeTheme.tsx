import { useContext } from 'react'
import { ThemeContext } from '../state/ThemeContext'

export const useChangeTheme = () => useContext(ThemeContext).changeTheme
