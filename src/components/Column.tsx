import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const columnList = useSelector((state: RootState) => state.columnList)

    const handleClick = () => {
        const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
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
                    isThisTheLastColumn(data, columnList) 
                    && <Button  
                        onClick={() => console.log('archive')}
                        >Archivar tareas</Button>
                }
            </CardFooter>
        </Card>
    )
}