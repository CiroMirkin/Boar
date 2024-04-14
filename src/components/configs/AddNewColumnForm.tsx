import { iconSize } from "@/configs/iconsConstants";
import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addColumn } from "@/redux/columnListReducer"
import { addEmptyTaskListAtTheEnd } from "@/redux/taskListInEachColumnReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"
import { getBlankColumnWithoutPosition } from "../../models/column"
import { Input } from "@/ui/input";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export function AddNewColumnForm() {
    const [ newColumnName, setNewColumnName ] = useState('')
    const canUserCreateTheNewColumn: boolean = !newColumnName;
    const updateBoardData = useDispatch()
    const { toast } = useToast()

    const addNewColumn = () => {
        const newColumn = getBlankColumnWithoutPosition({ name: newColumnName})
        updateBoardData(addColumn(newColumn))
        updateBoardData(addEmptyTaskListAtTheEnd())
        setNewColumnName('')
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.ctrlKey && e.key === "Enter") {
            if(!!newColumnName.trim()) handleClick(addNewColumn)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newColumnNameFromInput = e.target.value
        setNewColumnName(newColumnNameFromInput)
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
        <li className="self-center sm:self-end flex w-full max-w-sm gap-1.5">
            <Input 
                type="text" 
                aria-label="Crear columna" 
                placeholder="Nombre de la columna" 
                className="w-full"
                value={newColumnName}
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
            />
            <Button onClick={() => handleClick(addNewColumn)} title="Crear columna" disabled={canUserCreateTheNewColumn} >
                <Plus size={iconSize} />
            </Button>
        </li>
    )
}