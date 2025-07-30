import { useTheme } from "@/App"
import { ListOfColumn, ColumnsContent } from "./ListOfColumns"

export function ListView({ children }: { children: () => ColumnsContent}) {
    const colorTheme = useTheme()
    const className = `w-full max-w-3xl mx-auto flex flex-col justify-stretch items-stretch rounded-lg ${colorTheme.column}`
    
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-5'>
            <div className={className}>
                <ListOfColumn>{ children }</ListOfColumn>
            </div>
        </div>
    )
}