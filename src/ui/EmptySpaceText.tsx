import { useTheme } from "@/App"


interface EmptySpaceTextProps {
    className?: string
    children: string | string[]
}

export function EmptySpaceText({ children, className = '' }: EmptySpaceTextProps) {
    const colorTheme = useTheme()
    return (
        <p className={`w-full text-xl! opacity-50 ${colorTheme.text} ${className}`}>
		    { children }
		</p>
    )
}