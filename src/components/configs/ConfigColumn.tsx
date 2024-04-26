import { useState } from "react"
import { columnModel, isThisColumnNameWithinTheLimitOfLetters } from "../../models/column"
import { useDispatch } from "react-redux"
import { changeColumnName, deleteColumn } from "@/redux/columnListReducer"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import { useToast } from "../../ui/use-toast"
import { Pencil, Trash2 } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"
import { Input } from "@/ui/input"
import { deleteTheTaskListOfThisColumn } from "@/redux/taskListInEachColumnReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"
import { useAskForConfirmationToast } from "@/hooks/askForConfirmation"

interface ConfigColumnParams {
    column: columnModel
}

export function ConfigColumn({ column }: ConfigColumnParams) {
    const [ showChangeColumnNameInput, setShowChangeColumnNameInput ] = useState(false)
    const [ columnName, setColumnName ] = useState(column.name)
    const updateBoardData = useDispatch()
    const { toast } = useToast()

    const editColumnNameHandle = () => {
        try{
            if(showChangeColumnNameInput) {
                updateBoardData(changeColumnName({ column, newColumnName: columnName }))
            }
            setShowChangeColumnNameInput(!showChangeColumnNameInput)
        } catch(e) {
            toast({
                description: getErrorMessageForTheUser(e),
                variant: "destructive",
                duration: 3000
            })
        }
    }
    
    const deleteColumnHandle = () => {
        try {
            updateBoardData(deleteColumn(column))
            updateBoardData(deleteTheTaskListOfThisColumn(column))
        }
        catch (error) {
            toast({
                description: getErrorMessageForTheUser(error),
                variant: "destructive",
                duration: 3000
            })
        }
    }

    const askForConfirmationToDeleteTheColumn = useAskForConfirmationToast({
        confirmationText:  `¿Seguro que quieres eliminar la columna "${columnName}"?`,
        action: deleteColumnHandle
    })

    return (
        <Card key={column.id} className="px-2 pb-4 md:pb-1 pt-1 flex content-center justify-between flex-wrap border">
            <CardContent className="pb-0 pt-1 md:pt-0 px-4 grid grid-flow-col justify-stretch gap-1.5 gap-2 w-full md:w-auto md:flex md:items-center">
                <Input 
                    value={columnName} 
                    onChange={(e) => isThisColumnNameWithinTheLimitOfLetters(e.target.value) && setColumnName(e.target.value)} 
                    disabled={!showChangeColumnNameInput}
                />
                <Button
                    onClick={editColumnNameHandle}
                    variant="ghost"
                >
                    <Pencil size={iconSize} />
                </Button>
                <Button 
                    onClick={askForConfirmationToDeleteTheColumn} 
                    variant="destructiveGhost"
                > 
                    <Trash2 size={iconSize} />
                </Button>
            </CardContent>
        </Card>
    )
}