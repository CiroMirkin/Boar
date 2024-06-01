import React, { createContext, useState } from "react";
import { taskModel, emptyTask } from "../models/task";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TextWithURL } from "@/lib/TextWithURL";

export const TaskContext = createContext(emptyTask)

interface TaskProps {
    data: taskModel,
    children?: React.ReactNode
}

export function Task({ data, children }: TaskProps) {
    const [ show, setShow ] = useState(false)
    const description = data.descriptionText

    return (
        <TaskContext.Provider value={ data }>
            <Card onClick={() => setShow(!show)} className="p-0 rounded-md border-2 border-black bg-card text-card-foreground shadow-sm">
                <CardContent className="rounded-md hover:bg-accent px-3 py-1.5 text-xl">
                    <p>
                        <TextWithURL text={description}></TextWithURL>
                    </p>
                </CardContent>
                { show && children }
            </Card>
        </TaskContext.Provider>
    )
}

function TaskActions({ children }: { children: React.ReactNode }) {
    return (
        <CardFooter className="flex flex-col justify-between gap-x-1 gap-y-1.5 items-start p-2 pt-1">
            { children }
        </CardFooter>
    )
}

/** El children de TaskActions se muestra y oculta cuando el usuario hace click sobre el contenido del componente Task. */
Task.TaskActions = TaskActions