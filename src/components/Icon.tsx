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

export const clipboardIcon = () => (<i className="bi bi-clipboard2-fill"></i>)