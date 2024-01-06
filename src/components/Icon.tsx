export type iconType = 'three-dots' | 'trash-fill' | 'caret-right-fill' | 'caret-left-fill' | 'pencil-square' | 'clipboard2-fill'

interface IconProps {
  name: iconType
}

function Icon({ name }: IconProps) {
  return (
    <i className={`bi bi-${name}`}></i>
  )
}

export default Icon

export const ClipboardIcon = ({}) => (<i className="bi bi-clipboard2-fill"></i>)
export const ThreeDotsIcon = ({}) => (<i className="bi bi-three-dots"></i>)
export const TrashIcon = ({}) => (<i className="bi bi-trash-fill"></i>)
export const CaretRightIcon = ({}) => (<i className="bi bi-caret-right-fill"></i>)
export const CaretLeftIcon = ({}) => (<i className="bi bi-caret-left-fill"></i>)
export const PencilSquareIcon = ({}) => (<i className="bi bi-pencil-square"></i>)