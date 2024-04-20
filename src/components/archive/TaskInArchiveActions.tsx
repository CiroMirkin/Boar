import { useContext } from "react";
import { TaskContext } from "../Task";
import { Button } from "@/ui/button";
import { useDispatch } from "react-redux";
import { deleteArchivedTask } from "@/redux/archiveReducer";
import { useToast } from "@/ui/use-toast";
import { ToastAction } from "@/ui/toast";
import { addTaskAtLastColumn } from "@/redux/taskListInEachColumnReducer";

export function TaskInArchiveActions() {
    const data = useContext(TaskContext)
    const { toast } = useToast();

    const dispatch = useDispatch()
    
    const deleteTask = () => {
        dispatch(deleteArchivedTask(data))
    }
    const returnTaskToLastColumn = () => {
        dispatch(addTaskAtLastColumn(data))
        dispatch(deleteArchivedTask(data))
        toast({
            description: 'La tarea regreso a la última columna.',
            duration: 3000
        })
    }

    const askForConfirmationToDeleteTheTask = () => toast({
        description: `¿Seguro que quieres eliminar esta tarea?`,
        variant: "destructive",
        duration: 3000,
        action: <ToastAction altText="Eliminar" onClick={deleteTask}>Eliminar</ToastAction>,
    })

    return (
        <>
            <Button  
                size="sm"
                onClick={returnTaskToLastColumn}
                variant='ghost'
                className="w-full"
            >Regresar tarea al tablero</Button>
            <Button 
                size="sm" 
                variant="destructiveGhost" 
                className="w-full" 
                onClick={askForConfirmationToDeleteTheTask}
            >Eliminar</Button>
        </>
    )
}