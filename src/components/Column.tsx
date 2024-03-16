import React, { useState } from "react";
import { columnModel } from "../models/column";
import { BoardData } from "../App";
import { isThisTheFirstColumn, isThisTheLastColumn } from "../utility/firstOrLastColumn";
import './Column.css'
import { addTaskInFirstColumn } from "../useCase/addTask";
import { archiveTaskListInTheLastColumn } from "../useCase/archiveTaskList";
import { getNewTask, taskNull } from "../models/task";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"  
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const board = React.useContext(BoardData).board

    const updateBoard = React.useContext(BoardData).update
    const handleClick = () => {
        const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
        updateBoard({
            action: addTaskInFirstColumn,
            task
        })
        setNewTaskDescription('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ data.name }</CardTitle>
            </CardHeader>
            <CardContent>
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
                    isThisTheLastColumn(data, board.columnList) 
                    && <Button  
                        onClick={() => updateBoard({
                            action: archiveTaskListInTheLastColumn,
                            task: taskNull
                        })}
                        >Archivar tareas</Button>
                }
            </CardFooter>
        </Card>
    )
}