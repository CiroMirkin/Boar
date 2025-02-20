import { ColorTheme } from "@/modules/shared/configs/colors";
import { RootState } from '@/store'
import { useState } from "react";
import { useSelector } from 'react-redux'

const blankTheme = {
    id: '',
    bg: '',
    task: '',
    column: '',
    text: ''
}

export const useColorTheme = (): ColorTheme => {
    const [ theme, setTheme ] = useState({...blankTheme} as ColorTheme) 
    const actualTheme = useSelector((state: RootState) => state.board.colorTheme)

    if(!theme.bg || theme.bg != actualTheme.bg) {
        setTheme({...actualTheme})
    }

    return theme
}