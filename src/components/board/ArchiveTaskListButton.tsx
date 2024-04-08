import { archiveTaskListAtLastColumn } from "@/redux/archiveReducer"
import { deleteLastTheTaskList } from "@/redux/taskListInEachColumnReducer"
import { useToast } from "@/ui/use-toast"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { TaskListInEachColumnContext } from "./Board"
import { Button } from "@/ui/button"
import { Archive } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"

export function ArchiveTaskListButton() {
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
        <Button  
            onClick={archiveTaskList}
            variant='ghost'
            className="w-full"
        >
            <Archive size={iconSize} className="mr-2" /> Archivar tareas
        </Button>
    )
}