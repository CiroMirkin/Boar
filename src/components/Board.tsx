import React from "react"
import { boardModel } from "../models/board"
import { ColumnList } from "./ColumnList"
import { TaskList } from "./TaskList"
import { columnModel } from "@/models/column"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { taskList } from "@/models/task"

interface BoardProps {
    children?: React.ReactNode
    data: boardModel
    taskListInEachColumn: taskList[]
}

export function Board({ data, taskListInEachColumn }: BoardProps) {
    const columnsContent: React.ReactNode[] = []
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