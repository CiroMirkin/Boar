import { useTheme } from "@/App"
import { ListOfColumn, ColumnsContent } from "./ListOfColumns"

export function ListView({ children }: { children: () => ColumnsContent}) {
    const colorTheme = useTheme()
    const className = `h-auto min-w-2xl mx-6 md:mx-11 flex flex-col justify-stretch items-strech rounded-lg ${colorTheme.column}`
    return (
        <div className='w-full pb-5 grid justify-items-stretch'>
            <div className={className}>
                <ListOfColumn>{ children }</ListOfColumn>
            </div>
        </div>
    )
}