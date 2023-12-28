import { columnModel } from "../models/column";

export const addColumnAtTheEnd = (columnName: string, columns: columnModel[]): columnModel[] => {
    const lastColumn = columns.at(-1)
    const increaseTheLastId = (): string => (Number(lastColumn?.id)+1).toString();
    const newColumn = {
        name: columnName,
        id: increaseTheLastId(),
        taskList: []
    }
    const newColumns = [...columns]
    newColumns.push(newColumn)
    return newColumns
}