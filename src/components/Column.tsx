import React, { createContext, useContext, useState } from "react";
import { columnModel, columnNull } from "../models/column";
import { isThisTheFirstColumn, isThisTheLastColumn } from "@/models/column";
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
import { useDispatch } from "react-redux";
import { addTaskAtFirstColumn, deleteLastTheTaskList } from "@/redux/taskListInEachColumnReducer";
import { archiveTaskListAtLastColumn } from "@/redux/archiveReducer";
import { ColumnListContext, TaskListInEachColumnContext } from "../pages/board/Board";
import { Archive, Plus } from "lucide-react";
import { iconSize } from "@/iconsConstants";
import { useToast } from "./ui/use-toast";

const ColumnContext = createContext(columnNull)

interface ColumnProps {
    data: columnModel
    children: React.ReactNode 
}

export function Column({ data, children }: ColumnProps) {
    return (
        <ColumnContext.Provider value={data} >
            <Card className="h-auto min-w-80 flex-1 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle>{ data.name }</CardTitle>
                </CardHeader>
                
                { children }
            </Card>
        </ColumnContext.Provider>
    )
}

function ColumnContent({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <CardContent className={className ? className : ''}>
            
            { children }

        </CardContent>
    )
}
Column.ColumnContent = ColumnContent

function ColumnFooter({  }: {  }) { 
    const data = useContext(ColumnContext)
    const [ newTaskDescription, setNewTaskDescription ] = useState('')
    const columnList = useContext(ColumnListContext)

    const { toast } = useToast()

    const dispatch = useDispatch()
    
    const taskListInEachColumn = useContext(TaskListInEachColumnContext)
    const archiveTaskList = () => {
        try{
            dispatch(archiveTaskListAtLastColumn(taskListInEachColumn))
            dispatch(deleteLastTheTaskList())
            toast({
                description: "Puedes ver las tareas archivadas yendo al menu.",
                duration: 3000
            })
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

    const handleClick = () => {
        const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
        dispatch(addTaskAtFirstColumn(task))
        setNewTaskDescription('')
    }
    return (
        <CardFooter className="min-h-16">
            {
                isThisTheFirstColumn(data, columnList) 
                && <>
                    <Input 
                        type="text" value={newTaskDescription} 
                        className="mr-1.5"
                        onChange={(e) => setNewTaskDescription(e.target.value)}  
                        placeholder="Nueva tarea..."
                    />
                    <Button 
                        onClick={handleClick} 
                        variant='ghost' 
                        title="Crear tarea" 
                    ><Plus size={iconSize} /></Button>
                </>
            }
            {
                isThisTheLastColumn(data, columnList) 
                && <Button  
                    onClick={archiveTaskList}
                    variant='ghost'
                    className="w-full"
                    ><Archive size={iconSize} className="mr-2" /> Archivar tareas</Button>
            }
        </CardFooter>
    )
}
Column.Footer = ColumnFooter