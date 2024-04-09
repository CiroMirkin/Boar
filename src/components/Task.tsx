import React, { createContext, useState } from "react";
import { taskModel, emptyTask } from "../models/task";
import { deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn } from "@/redux/taskListInEachColumnReducer";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/SmallCard";
import { useToast } from "../ui/use-toast";
import { isThisTaskInTheFirstColumn } from "@/utils/isTheTaskInTheFirstColumn";
import { isThisTaskInTheLastColumn } from "@/utils/isThisTaskInTheLastColumn";

const TaskContext = createContext(emptyTask)

interface TaskProps {
    data: taskModel,
    children?: React.ReactNode
}

export function Task({ data, children }: TaskProps) {
    const [ show, setShow ] = useState(false)
    const description = data.descriptionText

    return (
        <TaskContext.Provider value={ data }>
            <Card onClick={() => setShow(!show)}>
                <CardContent>
                    <p>{ description }</p>
                </CardContent>
                { show && children }
            </Card>
        </TaskContext.Provider>
    )
}

function TaskActions() {
    const data = React.useContext(TaskContext)

    const { toast } = useToast();
    const copyTextToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                description: 'Texto copiado al portapapeles',
                duration: 3000
            })
        })
    }

    const deleteTaskAction = () => deleteTask
    const moveTaskToNextColumnAction = () => moveTaskToNextColumn
    const moveTaskToPrevColumnAction = () => moveTaskToPrevColumn

    const dispatch = useDispatch()
    
    const handleClick = (action: Function) => {
        try {
            dispatch(action(data))
        }
        catch(error){
            let message: string = 'Unknown Error :('
            if (error instanceof Error) {
                message = error.message
            }
            toast({
                description: message,
                variant: "destructive",
                duration: 3000
            })
        }
    }
    return (
        <CardFooter className="flex flex-col justify-between gap-x-1 gap-y-1.5">
            <div className="w-full grid grid-flow-col justify-stretch gap-1.5">
                <Button size="sm" disabled={isThisTaskInTheFirstColumn(data) && true} variant={isThisTaskInTheFirstColumn(data) ? 'ghost' : 'default'} onClick={() => handleClick(moveTaskToPrevColumnAction())}>Retroceder</Button>
                <Button size="sm" disabled={isThisTaskInTheLastColumn(data) && true} variant={isThisTaskInTheLastColumn(data) ? 'ghost' : 'default'} onClick={() => handleClick(moveTaskToNextColumnAction())}>Avanzar</Button>
            </div>
            <Button size="sm" variant="ghost" className="w-full" onClick={() => copyTextToClipboard(data.descriptionText)}>Copiar texto</Button>
            <Button size="sm" variant="destructiveGhost" className="w-full" onClick={() => handleClick(deleteTaskAction())}>Eliminar</Button>
        </CardFooter>
    )
}

Task.TaskActions = TaskActions