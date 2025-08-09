import { useTheme } from "@/App"
import { ListOfColumn, ColumnsContent } from "./ListOfColumns"

export function ListView({ children, className = '' }: { children: () => ColumnsContent, className?: string}) {
    const colorTheme = useTheme()
    
    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            <div className={`w-full max-w-3xl mx-auto flex flex-col justify-stretch items-stretch rounded-lg ${colorTheme.column} ${className}`}>
                <ListOfColumn>{ children }</ListOfColumn>
            </div>
        </div>
    )
}