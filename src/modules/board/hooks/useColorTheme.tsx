import { ColorTheme } from "@/configs/colors";
import { RootState } from '@/store'
import { useState } from "react";
import { useSelector } from 'react-redux'

const blankTheme = {
    bg: '',
    text: ''
}

export const useColorTheme = (): ColorTheme => {
    const [ theme, setTheme ] = useState({...blankTheme} as ColorTheme) 
    const actualTheme = useSelector((state: RootState) => (
        { bg: state.board.colorTheme.bg, text: state.board.colorTheme.text }
    ))

    if(!theme.bg || theme.bg != actualTheme.bg) {
        setTheme({...actualTheme})
    }

    return theme
}