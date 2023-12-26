export type iconType = 'three-dots' | 'trash-fill' | 'caret-right-fill' | 'caret-left-fill' | 'pencil-square'

interface IconProps {
  name: iconType
}

function Icon({ name }: IconProps) {
  return (
    <i className={`bi bi-${name}`}></i>
  )
}

export default Icon