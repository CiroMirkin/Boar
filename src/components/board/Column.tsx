import React, { createContext, useContext } from "react";
import { columnModel, columnNull } from "../../models/column";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/ui/card"  
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { deleteLastTheTaskList } from "@/redux/taskListInEachColumnReducer";
import { archiveTaskListAtLastColumn } from "@/redux/archiveReducer";
import { TaskListInEachColumnContext } from "./Board";
import { Archive } from "lucide-react";
import { iconSize } from "@/configs/iconsConstants";
import { useToast } from "../../ui/use-toast";
import { isThisColumnTheFirst } from "@/utils/isThisColumnTheFirst";
import { isThisColumnTheLast } from "@/utils/isThisColumnTheLast";
import { AddNewTaskInput } from "./AddNewTaskInput";

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

    return (
        <CardFooter className="min-h-16">
            {
                isThisColumnTheFirst(data) && <AddNewTaskInput />
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