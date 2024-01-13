import { MouseEventHandler } from "react"
import './Btn.css'
import { COLORS_CLASS_NAME } from "./colors"

interface BtnProps {
    color: COLORS_CLASS_NAME
    children: React.ReactNode
    border?: boolean
    neoBtn?: boolean
    widthAuto?: boolean
    onClickHandler: MouseEventHandler<HTMLButtonElement>
}

export function Btn({ color, neoBtn = false, border=true, widthAuto=true, children, onClickHandler }:  BtnProps) {
    const btnClassName = `btn btn--${color} ${neoBtn ? "btn-border--neo" : ''} ${border && 'btn--border'} ${widthAuto && 'btn-width-100'}`
    return (
        <button className={btnClassName} onClick={onClickHandler}>
            { children }
        </button>
    )
}