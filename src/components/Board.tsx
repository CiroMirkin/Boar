import { boardData } from "../models/board"

interface BoardProps {
    data: boardData,
    children: React.ReactNode
}

export function Board({ data, children }: BoardProps) {
    console.log(data)
    return (
        <>
        <h1>{ data.name }</h1>
        { children }
        </>
    )
}