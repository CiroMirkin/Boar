import { ListOfColumn, ColumnsContent } from "./ListOfColumns"

export function TableView({ children }: { children: () => ColumnsContent}) {
    const className = 'h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch items-start gap-3'
    return (
        <div className={className}>
            <ListOfColumn>{ children }</ListOfColumn>
        </div>
    )
}