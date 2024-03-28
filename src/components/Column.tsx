import React, { createContext, useContext, useState } from "react";
import { columnModel, columnNull } from "../models/column";
import { isThisTheFirstColumn, isThisTheLastColumn } from "../utility/firstOrLastColumn";
import './Column.css'
import { getNewTask } from "../models/task";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"  
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ColumnListContext } from "@/App";
import { useDispatch } from "react-redux";
import { addTaskAtFirstColumn, deleteLastTheTaskList } from "@/redux/taskListInEachColumnReducer";
import { archiveTaskListAtLastColumn } from "@/redux/archiveReducer";
import { TaskListInEachColumnContext } from "./Board";

const ColumnContext = createContext(columnNull)

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    return (
        <Card className="h-auto flex-1 flex flex-col justify-between">
            <ColumnContext.Provider value={data} >
            <CardHeader>
                <CardTitle>{ data.name }</CardTitle>
            </CardHeader>
            { children }
            </ColumnContext.Provider>
        </Card>
    )
}

function ColumnContent({ children }: { children: React.ReactNode }) {
    return (
        <CardContent className="h-96">
            <ScrollArea className="h-full w-full rounded-md">
                { children }
            </ScrollArea>
        </CardContent>
    )
}
Column.ColumnContent = ColumnContent

function ColumnFooter({  }: {  }) { 
    const data = useContext(ColumnContext)
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const columnList = useContext(ColumnListContext)

    const dispatch = useDispatch()
    
    const taskListInEachColumn = useContext(TaskListInEachColumnContext)
    const archiveTaskList = () => {
        dispatch(archiveTaskListAtLastColumn(taskListInEachColumn))
        dispatch(deleteLastTheTaskList())
    }

    const handleClick = () => {
        const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
        dispatch(addTaskAtFirstColumn(task))
        setNewTaskDescription('')
    }
    return (
        <CardFooter>
            {
                isThisTheFirstColumn(data) 
                && <>
                    <Input 
                        type="text" value={newTaskDescription} 
                        className="mr-1.5"
                        onChange={(e) => setNewTaskDescription(e.target.value)}  
                    />
                    <Button onClick={handleClick}>Añadir</Button>
                </>
            }
            {
                isThisTheLastColumn(data, columnList) 
                && <Button  
                    onClick={archiveTaskList}
                    >Archivar tareas</Button>
            }
        </CardFooter>
    )
}
Column.Footer = ColumnFooter