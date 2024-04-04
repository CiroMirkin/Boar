import { columnUseCaseParams } from "../useCase";
import { columnModel } from "../../model/column";

interface changeNameOfColumnParams extends columnUseCaseParams {
    newName: string
}

export function changeNameOfColumn({ columnList, column, newName }: changeNameOfColumnParams): columnModel[] {
    const newColumnList = columnList.map(columnInBoard => {
        if(columnInBoard.id === column.id) {
            columnInBoard.name = newName
        }
        return columnInBoard
    })
    return newColumnList
}