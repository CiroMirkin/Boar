import { columnModel } from "../models/column";

interface getColumn {
    columnName: string,
    columns: columnModel[]
}

export const getColumn = ({ columnName, columns }: getColumn): columnModel => {
    const getColumnId = (): string => {
        const lastColumn = columns.at(-1)
        const lastColumnId = lastColumn?.position
        const newColumnId = Number(lastColumnId) + 1
        return newColumnId.toString()
    }
    const newColumn = {
        name: columnName,
        id: getColumnId(),
        taskList: []
    }
    return newColumn
}