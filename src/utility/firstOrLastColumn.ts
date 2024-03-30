import { columnModel } from "../models/column";

export const isThisTheFirstColumn = (column: columnModel, columnList: columnModel[]): boolean => {
    if(columnList[0].id === column.id) {
        return true
    }
    return false
}

export const isThisTheLastColumn = (column: columnModel, columnList: columnModel[]): boolean => {
    if(columnList[columnList.length -1].id === column.id) {
        return true
    }
    return false
}