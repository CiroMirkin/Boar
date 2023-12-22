export type iconType = 'three-dots' | 'trash-fill' | 'caret-right-fill' | 'caret-left-fill'

interface IconProps {
  name: iconType
}

function Icon({ name }: IconProps) {
  return (
    <i className={`bi bi-${name}`}></i>
  )
}

export default Icon