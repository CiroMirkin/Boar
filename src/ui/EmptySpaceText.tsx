import { useTheme } from "@/App"


interface EmptySpaceTextProps {
    className?: string
    children: string | string[]
    textSize?: 'lg' | 'xl'
}

export function EmptySpaceText({ children, className = '', textSize = 'xl' }: EmptySpaceTextProps) {
    const colorTheme = useTheme()
    return (
        <p className={`w-full text-${textSize} opacity-50 ${colorTheme.text} ${className}`}>
		    { children }
		</p>
    )
}