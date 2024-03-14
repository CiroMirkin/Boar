import { columnModel } from "../models/column";
import { getIndexOfColumnInColumnList } from "./indexOfColumn";

export const isThisTheFirstColumn = (column: columnModel): boolean => {
    if(getIndexOfColumnInColumnList(column.position) === 0) {
        return true
    }
    return false
}

export const isThisTheLastColumn = (column: columnModel, columnList: columnModel[]): boolean => {
    if(columnList.length === Number(column.position)) {
        return true
    }
    return false
}