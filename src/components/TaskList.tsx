import React from "react"
import { BoardDataContext } from "./Board"
import { Task } from "./Task"

interface TaskListProps {
    columnPosition: string
}

export function TaskList({ columnPosition }: TaskListProps) {
    const columnIndex = (Number(columnPosition) - 1)
    const tasks = React.useContext(BoardDataContext).tasksInColumns[columnIndex]
    const taskList: React.ReactNode[] = []

    tasks.forEach(task => {
        taskList.push(
            <Task data={task} key={task.id} />
        )
    })

    return (
        <>
            { taskList }
        </>
    )
}