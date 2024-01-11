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
    neoBtn?: boolean
    onClickHandler: MouseEventHandler<HTMLButtonElement>
}

export function Btn({ color, neoBtn = false, children, onClickHandler }:  BtnProps) {
    const btnClassName = `btn btn--${color} ${neoBtn ? "btn-border--neo" : ''}`
    return (
        <button className={btnClassName} onClick={onClickHandler}>
            { children }
        </button>
    )
}