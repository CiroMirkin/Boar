
enum BTN_COLORS {
    PRIMARY = 'primary',
    DANGER = 'danger',
    SUCCESS = 'success'
}

interface BtnProps {
    color: BTN_COLORS
    children: React.ReactNode
    neoBtn: boolean
}

export function Btn({ color, neoBtn, children }:  BtnProps) {
    const btnClassName = `btn btn--${color} ${neoBtn && "btn-border--neo"}`
    return (
        <button className={btnClassName}>
            { children }
        </button>
    )
}