import { iconSize } from "@/configs/iconsConstants";
import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addColumn } from "@/redux/columnListReducer"
import { addEmptyTaskListAtTheEnd } from "@/redux/taskListInEachColumnReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"
import { getBlankColumnWithoutPosition } from "../../models/column"

export function AddNewColumnForm() {
    const updateBoardData = useDispatch()
    const { toast } = useToast()

    const addNewColumn = () => {
        const newColumn = getBlankColumnWithoutPosition({ name: 'Nueva columna'})
        updateBoardData(addColumn(newColumn))
        updateBoardData(addEmptyTaskListAtTheEnd())
    }

    const handleClick = (action: Function) => {
        try {
            action()
        }
        catch (error) {
            toast({
                description: getErrorMessageForTheUser(error),
                variant: "destructive",
                duration: 3000
            })
        }
    }

    return(
        <li className="self-center sm:self-end">
            <Button onClick={() => handleClick(addNewColumn)} title="Crear columna" >
                <Plus size={iconSize} />
            </Button>
        </li>
    )
}