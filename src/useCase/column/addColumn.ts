import { columnUseCaseParams } from "../useCase";
import { columnModel } from "@/model/column";

export function addColumnAtTheEnd({ columnList, column }: columnUseCaseParams): columnModel[] {
    if(column.position === '-1') {
        column.position = JSON.stringify(columnList.length + 1)
    }
    columnList.push(column)
    return columnList
}

