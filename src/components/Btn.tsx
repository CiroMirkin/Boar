import { MouseEventHandler } from "react"
import './Btn.css'

export enum BTN_COLORS {
    PRIMARY = 'primary',
    DANGER = 'danger',
    SUCCESS = 'success'
}

interface BtnProps {
    color: BTN_COLORS
    children: React.ReactNode
    border?: boolean
    neoBtn?: boolean
    widthAuto?: boolean
    onClickHandler: MouseEventHandler<HTMLButtonElement>
}

export function Btn({ color, neoBtn = false, border=true, widthAuto=false, children, onClickHandler }:  BtnProps) {
    const btnClassName = `btn btn--${color} ${neoBtn ? "btn-border--neo" : ''} ${border && 'btn--border'} ${widthAuto && 'btn-width-100'}`
    return (
        <button className={btnClassName} onClick={onClickHandler}>
            { children }
        </button>
    )
}