import React, { useContext } from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { defaultColumnList } from "@/models/column"
import { TaskListInEachColumnContext } from "@/App"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"

interface BoardProps {
    children?: React.ReactNode
}

export function Board({}: BoardProps) {
    const data: boardModel = {
        id: '1',
        name: 'Tablero básico'
    }
    const columnsContent: React.ReactNode[] = []
    const taskListInEachColumn = useContext(TaskListInEachColumnContext);
    taskListInEachColumn.forEach(taskList => {
        columnsContent.push(
            <TaskList tasks={taskList} />
        )
    })
    return (
        <>
            <header className="w-full px-6 my-4 flex justify-between items-center">
                <h1 className="text-4xl font-normal">{ data.name }</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Boar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Preferencias</DropdownMenuItem>
                        <DropdownMenuItem>Archivo</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <ColumnList columnsContent={columnsContent} />
        </>
    )
}