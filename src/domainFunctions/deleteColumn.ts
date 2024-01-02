import { columnModel } from "../models/column"

interface deleteThisColumnFromColumnsParams {
    columnId: string,
    columns: columnModel[]
}

export const deleteThisColumnFromColumns = ({ columnId, columns }: deleteThisColumnFromColumnsParams): columnModel[] => {
    if(columns.length > 3) {
        const newColumns = [...columns].filter(column => column.id !== columnId)
        return newColumns
    }
    return columns
}