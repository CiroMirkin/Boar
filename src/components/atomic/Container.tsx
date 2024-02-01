import './Container.css'

export enum CONTAINER_BORDER_TYPES {
    NEO = 'neo-border',
    NORMAL = 'normal-border',
    NONE = 'none-border'
}

interface ContainerProps {
    children: React.ReactNode
    customClassName?: string
    borderType?: CONTAINER_BORDER_TYPES
}

export function Container({ borderType=CONTAINER_BORDER_TYPES.NONE, customClassName, children }: ContainerProps) {
    customClassName = customClassName?.trim() ? customClassName : ''
    const className = `container ${borderType} ${customClassName}`
    return (
        <div className={className}>
            { children }
        </div>
    )
}

export enum FLEX_DIRECTIONS {
    COLUMN = 'column',
    ROW = 'row'
}

interface FlexContainerProps {
    customClassName?: string
    direction: FLEX_DIRECTIONS
    wrap: boolean
    borderType: CONTAINER_BORDER_TYPES
    children: React.ReactNode
}

export function FlexContainer({ customClassName, direction, wrap, borderType, children }: FlexContainerProps) {
    customClassName = customClassName?.trim() ? customClassName : ''
    const flexWrapClassName = wrap ? 'flex-container--wrap': 'flex-container--nowrap'
    const flexDirectionClassName = `flex-container--${direction}`
    const className = `flex-container ${flexWrapClassName} ${flexDirectionClassName} ${borderType} ${customClassName}`
    return (
        <div className={className}>
            { children }
        </div>
    )
}

FlexContainer.defaultProps = {
    direction: FLEX_DIRECTIONS.COLUMN,
    wrap: false,
    borderType: CONTAINER_BORDER_TYPES.NONE
}