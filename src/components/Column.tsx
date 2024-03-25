import React, { useContext, useState } from "react";
import { columnModel } from "../models/column";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ColumnListContext } from "@/App";
import { useDispatch } from "react-redux";
import { addTaskAtFirstColumn } from "@/redux/taskListInEachColumnReducer";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const columnList = useContext(ColumnListContext)

    const dispatch = useDispatch()

    const handleClick = () => {
        const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
        dispatch(addTaskAtFirstColumn(task))
        setNewTaskDescription('')
    }

    return (
        <Card className="h-96 flex-1 flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{ data.name }</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
                { children }
            </CardContent>
            <CardFooter>
                {
                    isThisTheFirstColumn(data) 
                    && <>
                        <Input 
                            type="text" value={newTaskDescription} 
                            onChange={(e) => setNewTaskDescription(e.target.value)}  
                        />
                        <Button onClick={handleClick}>Añadir</Button>
                    </>
                    
                }
                {
                    isThisTheLastColumn(data, columnList) 
                    && <Button  
                        onClick={() => console.log('archive')}
                        >Archivar tareas</Button>
                }
            </CardFooter>
        </Card>
    )
}