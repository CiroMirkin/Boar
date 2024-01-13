import './Text.css'

export enum textWeight {
    NORMAL = '400',
    BOLD = '700'
}

export enum textAlign {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center'
}

interface TextProps {
    weight: textWeight
    align: textAlign
    customClassName?: string
    children: React.ReactNode
}

export function Text({ weight, align: align, customClassName, children }: TextProps) {
    const className = `text ${customClassName?.trim() && customClassName}`
    return (
        <p className={className} style={{ fontWeight: weight, textAlign: align }}>
            { children }
        </p>
    )
}