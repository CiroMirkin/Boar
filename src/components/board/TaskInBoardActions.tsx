import { Button } from "@/ui/button";
import { TaskContext } from "../Task";
import { useToast } from "@/ui/use-toast";
import { useDispatch } from "react-redux";
import { deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn } from "@/redux/taskListInEachColumnReducer";
import { isThisTaskInTheFirstColumn } from "@/utils/isTheTaskInTheFirstColumn";
import { isThisTaskInTheLastColumn } from "@/utils/isThisTaskInTheLastColumn";
import { useContext } from "react";
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser";

export function TaskInBoardActions() {
    const data = useContext(TaskContext)

    const { toast } = useToast();
    const copyTextToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                description: 'Texto copiado al portapapeles',
                duration: 3000
            })
        })
    }

    const deleteTaskAction = () => dispatch(deleteTask(data))
    const moveTaskToNextColumnAction = () => dispatch(moveTaskToNextColumn(data))
    const moveTaskToPrevColumnAction = () => dispatch(moveTaskToPrevColumn(data))

    const dispatch = useDispatch()
    
    const handleClick = (action: Function) => {
        try {
            action()
        }
        catch(error){
            toast({
                description: getErrorMessageForTheUser(error),
                variant: "destructive",
                duration: 3000
            })
        }
    }
    return (
        <>
            <div className="w-full grid grid-flow-col justify-stretch gap-1.5">
                <Button 
                    size="sm" 
                    disabled={isThisTaskInTheFirstColumn(data) && true} 
                    variant={isThisTaskInTheFirstColumn(data) ? 'ghost' : 'default'} 
                    onClick={() => handleClick(moveTaskToPrevColumnAction)}
                >Retroceder</Button>
                <Button 
                    size="sm" 
                    disabled={isThisTaskInTheLastColumn(data) && true} 
                    variant={isThisTaskInTheLastColumn(data) ? 'ghost' : 'default'} 
                    onClick={() => handleClick(moveTaskToNextColumnAction)}
                >Avanzar</Button>
            </div>
            <Button 
                size="sm" 
                variant="ghost" 
                className="w-full" 
                onClick={() => copyTextToClipboard(data.descriptionText)}
            >Copiar texto</Button>
            <Button 
                size="sm" 
                variant="destructiveGhost" 
                className="w-full" 
                onClick={() => handleClick(deleteTaskAction)}
            >Eliminar</Button>
        </>
    )
}