import { useState } from "react"
import { Column, isThisColumnNameWithinTheLimitOfLetters } from "../../models/column"
import { useDispatch } from "react-redux"
import { changeColumnName, deleteColumn } from "@/redux/columnListReducer"
import { Button } from "../../ui/button"
import { useToast } from "../../ui/use-toast"
import { Pencil, Trash2 } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"
import { Input } from "@/ui/input"
import { deleteTheTaskListOfThisColumn } from "@/redux/taskListInEachColumnReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"
import { useAskForConfirmationToast } from "@/hooks/askForConfirmation"

interface ConfigColumnParams {
    column: Column
}

export function ConfigColumn({ column }: ConfigColumnParams) {
    const [ showChangeColumnNameInput, setShowChangeColumnNameInput ] = useState(false)
    const [ columnName, setColumnName ] = useState(column.name)
    const updateBoardData = useDispatch()
    const { toast } = useToast()

    const editColumnNameHandle = () => {
        if(showChangeColumnNameInput) {
            updateBoardData(changeColumnName({ column, newColumnName: columnName }))
        }
        setShowChangeColumnNameInput(!showChangeColumnNameInput)

    }
    
    const deleteColumnHandle = () => {
        updateBoardData(deleteColumn(column))
        updateBoardData(deleteTheTaskListOfThisColumn(column))
    }

    const askForConfirmationToDeleteTheColumn = useAskForConfirmationToast({
        confirmationText:  `¿Seguro que quieres eliminar la columna "${columnName}"?`,
        action: deleteColumnHandle
    })

    const handleClick = (action: () => void) => {
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
        <li key={column.id} className="w-full p-2 flex flex-col gap-2 content-stretch border">
            <header className="w-full flex gap-2">
                <Input 
                    value={columnName} 
                    onChange={(e) => isThisColumnNameWithinTheLimitOfLetters(e.target.value) && setColumnName(e.target.value)} 
                    disabled={!showChangeColumnNameInput}
                />
                <Button
                    onClick={() => handleClick(editColumnNameHandle)}
                    variant="ghost"
                >
                    <Pencil size={iconSize} />
                </Button>
            </header>    
            <Button 
                onClick={() => handleClick(askForConfirmationToDeleteTheColumn)} 
                variant="destructiveGhost"
            > 
                <Trash2 size={iconSize} className="mr-2" /> Eliminar
            </Button>
        </li>
    )
}