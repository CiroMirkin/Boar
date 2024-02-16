import React from "react";
import { taskModel } from "../models/task";
import { BoardDataContext } from "./Board";

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
            {taskList}
        </>
    )
}

interface TaskProps {
    data: taskModel
}

export function Task({ data }: TaskProps) {
    return (
        <div>
            <p>{ data.descriptionText }</p>
        </div>
    )
}