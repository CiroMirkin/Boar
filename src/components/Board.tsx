import { boardData } from "../models/board"

interface BoardProps {
    data: boardData,
    children: JSX.Element
}

export function Board({ data, children }: BoardProps) {
    console.log(data)
    return (
        <>{ children }</>
    )
}