import React from 'react'
import './Paragraph.css'

export enum textWeight {
    NORMAL = '400',
    BOLD = '700'
}

export enum textAlign {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center'
}

interface ParagraphProps {
    weight: textWeight
    align: textAlign
    customStyles?: Object
    customClassName?: string
    children: React.ReactNode
}

export function Paragraph({ weight, align: align, customClassName, customStyles, children }: ParagraphProps) {
    const className = `text ${customClassName?.trim() && customClassName}`
    const textStyles = {
        fontWeight: weight, textAlign: align
    }
    return (
        <p className={className} style={{...textStyles, ...customStyles}}>
            { children }
        </p>
    )
}