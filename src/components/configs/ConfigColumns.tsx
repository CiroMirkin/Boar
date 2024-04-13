import React from "react"
import { getBlankColumnWithoutPosition } from "../../models/column"
import { columnModel } from "../../models/column"
import { useDispatch } from "react-redux"
import { addColumn } from "@/redux/columnListReducer"
import { Button } from "../../ui/button"
import { useToast } from "../../ui/use-toast"
import { Plus } from "lucide-react"
import { iconSize } from "@/configs/iconsConstants"
import { ConfigColumn } from "./ConfigColumn"
import { addEmptyTaskListAtTheEnd } from "@/redux/taskListInEachColumnReducer"
import getErrorMessageForTheUser from "@/utils/getErrorMessageForTheUser"

interface ConfigColumnsParams {
    columnList: columnModel[]
}

export function ConfigColumns({ columnList }: ConfigColumnsParams) {
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

    const columns: React.ReactNode[] = columnList.map(column =>
        <ConfigColumn column={column} key={column.id} />
    )
    return (
        <ul className="h-auto w-full py-5 flex flex-wrap flex-col justify-start gap-y-3 gap-x-3.5"> 
            { columns }
            <li className="self-center sm:self-end"><Button onClick={() => handleClick(addNewColumn)} title="Crear columna" ><Plus size={iconSize} /></Button></li>
        </ul>
    )
}