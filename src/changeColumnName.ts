import { columnModel } from "./models/column"

interface changeColumnNameParams {
    columnId: string, 
    newColumnName: string, 
    columns: columnModel[]
}

export const changeColumnName = ({ columnId, newColumnName, columns }: changeColumnNameParams): columnModel[] => {
    let columnNameIsChange = false;
    const newColumns = columns.map(column => {
        if(column.id === columnId) {
            column.name = newColumnName
            columnNameIsChange = true
        }
        return column
    })

    if(columnNameIsChange) {
        return newColumns
    }
    return columns
}