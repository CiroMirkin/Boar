import React from "react"
import { getBlankColumnWithoutPosition } from "../../models/column"
import { columnModel } from "../../models/column"
import { useDispatch } from "react-redux"
import { addColumn } from "@/redux/columnListReducer"
import { Button } from "../../ui/button"
import { useToast } from "../../ui/use-toast"
import { Plus } from "lucide-react"
import { iconSize } from "@/iconsConstants"
import { ConfigColumn } from "./ConfigColumn"

interface ConfigColumnsParams {
    columnList: columnModel[]
}

export function ConfigColumns({ columnList }: ConfigColumnsParams) {
    const updateBoardData = useDispatch()
    const { toast } = useToast()
    
    const getNewColumn = () => getBlankColumnWithoutPosition({ name: 'Nueva columna'})

    const handleClick = (action: Function, column: columnModel) => {
        try {
            updateBoardData(action(column))
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

    const columns: React.ReactNode[] = columnList.map(column =>
        <ConfigColumn column={column} key={column.id} />
    )
    return (
        <ul className="h-auto w-full py-5 px-6 flex flex-wrap flex-col justify-start gap-y-3 gap-x-3.5"> 
            { columns }
            <li className="self-center sm:self-end"><Button onClick={() => handleClick(addColumn, getNewColumn())} title="Crear columna" ><Plus size={iconSize} /></Button></li>
        </ul>
    )
}