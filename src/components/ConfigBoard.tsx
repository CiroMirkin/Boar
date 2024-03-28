import React from "react"
import { getBlankColumnWithoutPosition } from "../models/column"
import { columnModel } from "../models/column"
import { boardModel } from "@/models/board"
import { useDispatch } from "react-redux"
import { addColumn, deleteColumn } from "@/redux/columnListReducer"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

interface ConfigBoardParams {
    columnList: columnModel[]
    boardData: boardModel
}

export function ConfigBoard({ boardData, columnList }:ConfigBoardParams) {
    const updateBoardData = useDispatch()
    
    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: Function, column: columnModel) => {
        try {
            updateBoardData(action(column))
        }
        catch (error) {
            console.log(error) 
        }
    }

    const columns: React.ReactNode[] = columnList.map(column =>
        <Card key={column.id}>
            <CardHeader>
                <CardTitle>
                    {column.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button 
                    onClick={() => handleClick(deleteColumn, column)} 
                    variant="destructiveGhost" className="w-full"
                    >Eliminar</Button>
            </CardContent>
        </Card>
    )
    return (
        <>
            <div>
                <h2 className="px-6 text-2xl">{boardData.name}</h2>
            </div>
            <ul className="h-auto w-full py-5 px-6 flex flex-wrap items-end gap-y-3 gap-x-3.5">
                { columns }
                <li><Button onClick={() => handleClick(addColumn, getNewColumn())}>Nueva columna</Button></li>
            </ul>
        </>
    )
}