import { useState } from "react"
import { columnModel } from "../../models/column"
import { useDispatch } from "react-redux"
import { changeColumnName, deleteColumn } from "@/redux/columnListReducer"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { useToast } from "../../ui/use-toast"
import { Pencil, Trash2 } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"
import { Input } from "@/ui/input"

interface ConfigColumnParams {
    column: columnModel
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
        try {
            updateBoardData(deleteColumn(column))
        }
        catch (error) {
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

    return (
        <Card key={column.id} className="px-2 pb-4 md:pb-1 pt-1 flex content-center justify-between flex-wrap border">
            <CardHeader className={`${showChangeColumnNameInput ? "py-3": 'py-4'} w-auto`}>
                { 
                    showChangeColumnNameInput 
                        ? <Input 
                            value={columnName} 
                            onChange={(e) => setColumnName(e.target.value)} 
                            className="text-3xl font-semibold border-2" 
                            /> 
                        : <CardTitle className="pl-4">{columnName}</CardTitle>
                }
            </CardHeader>
            <CardContent className="pb-0 pt-1 md:pt-0 px-4 grid grid-flow-col justify-stretch gap-1.5 gap-2 w-full md:w-auto md:flex md:items-center">
                <Button
                    onClick={editColumnNameHandle}
                    variant="ghost"
                >
                    <Pencil size={iconSize} className="mr-2" /> Editar
                </Button>
                <Button 
                    onClick={deleteColumnHandle} 
                    variant="destructiveGhost"
                > 
                    <Trash2 size={iconSize} className="mr-2" /> Eliminar
                </Button>
            </CardContent>
        </Card>
    )
}