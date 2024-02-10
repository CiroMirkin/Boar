import { MouseEventHandler } from 'react'
import { COLORS_CLASS_NAME } from '../components/atomic/colors'

export interface option {
    id: string,
    name: string,
    color: COLORS_CLASS_NAME
    icon?: Function
}

export interface optionWithMouseEventHandler extends option {
    function: MouseEventHandler<HTMLButtonElement>,
}