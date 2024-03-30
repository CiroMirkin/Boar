import React, { createContext } from "react";
import { taskModel, taskNull } from "../models/task";
import { deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn } from "@/redux/taskListInEachColumnReducer";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/SmallCard";

const TaskContext = createContext(taskNull)

interface TaskProps {
    data: taskModel,
    children?: React.ReactNode
}

export function Task({ data, children }: TaskProps) {
    return (
        <TaskContext.Provider value={ data }>
            <Card>
                <TaskDescription />
            { children }
            </Card>
        </TaskContext.Provider>
    )
}

function TaskDescription() {
    const description = React.useContext(TaskContext).descriptionText
    return (
        <CardContent>
            <p>{ description }</p>
        </CardContent>
    )
}

function TaskActions() {
    const data = React.useContext(TaskContext)
    const deleteTaskAction = () => deleteTask
    const moveTaskToNextColumnAction = () => moveTaskToNextColumn
    const moveTaskToPrevColumnAction = () => moveTaskToPrevColumn

    const dispatch = useDispatch()
    
    const handleClick = (action: Function) => {
        dispatch(action(data))
    }
    return (
        <CardFooter className="flex flex-col justify-between gap-x-1 gap-y-1">
            <div className="w-full grid grid-flow-col justify-stretch gap-1.5">
                <Button size="sm" onClick={() => handleClick(moveTaskToPrevColumnAction())}>Retroceder</Button>
                <Button size="sm" onClick={() => handleClick(moveTaskToNextColumnAction())}>Avanzar</Button>
            </div>
            <Button size="sm" variant="destructiveGhost" className="w-full" onClick={() => handleClick(deleteTaskAction())}>Eliminar</Button>
        </CardFooter>
    )
}

Task.TaskActions = TaskActions