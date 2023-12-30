import { columnModel } from "../models/column";

export const addColumnAtTheEnd = (columnName: string, columns: columnModel[]): columnModel[] => {
    const getColumnId = (): string => {
        const lastColumn = columns.at(-1)
        const lastColumnId = lastColumn?.id
        const newColumnId = Number(lastColumnId) + 1
        return newColumnId.toString()
    }
    const newColumn = {
        name: columnName,
        id: getColumnId(),
        taskList: []
    }
    const newColumns = [...columns]
    newColumns.push(newColumn)
    return newColumns
}