import React, { ChangeEvent, KeyboardEvent, createContext, useContext, useState } from "react";
import { columnModel, columnNull } from "../../models/column";
import { getNewTask } from "../../models/task";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/ui/card"  
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { addTaskAtFirstColumn, deleteLastTheTaskList } from "@/redux/taskListInEachColumnReducer";
import { archiveTaskListAtLastColumn } from "@/redux/archiveReducer";
import { TaskListInEachColumnContext } from "./Board";
import { Archive, Plus } from "lucide-react";
import { iconSize } from "@/configs/iconsConstants";
import { useToast } from "../../ui/use-toast";
import { isThisColumnTheFirst } from "@/utils/isThisColumnTheFirst";
import { isThisColumnTheLast } from "@/utils/isThisColumnTheLast";

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
    const [ canUserUseTheAddTaskInput, setCanUserUseTheAddTaskInput ] = useState(false)

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
        try {
            const task = getNewTask({ descriptionText: newTaskDescription, columnPosition: '1'})
            dispatch(addTaskAtFirstColumn(task))
            setNewTaskDescription('')
            setCanUserUseTheAddTaskInput(false)
        }
        catch(error){
            let message: string = 'Unknown Error :('
            if (error instanceof Error) {
                message = error.message
            }
            console.error(message)
            toast({
                description: message,
                variant: "destructive",
                duration: 3000
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const taskDescription = e.target.value 
        setNewTaskDescription(taskDescription)
        if(!taskDescription.trim()) setCanUserUseTheAddTaskInput(false)
        else setCanUserUseTheAddTaskInput(true)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.ctrlKey && e.key === "Enter") handleClick()
    }

    return (
        <CardFooter className="min-h-16">
            {
                isThisColumnTheFirst(data) 
                && <>
                    <Input 
                        type="text" value={newTaskDescription} 
                        className="mr-1.5"
                        onChange={handleChange}  
                        onKeyDown={handleKeyDown}
                        placeholder="Nueva tarea..."
                    />
                    <Button 
                        onClick={handleClick} 
                        variant='ghost' 
                        disabled={!canUserUseTheAddTaskInput && true}
                        title="Crear tarea" 
                    ><Plus size={iconSize} /></Button>
                </>
            }
            {
                isThisColumnTheLast(data) 
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