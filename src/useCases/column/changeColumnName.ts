import { columnUseCaseParams } from "../useCase";
import { columnModel, isThisColumnNameWithinTheLimitOfLetters } from "../../models/column";
import BusinessError from "@/errors/businessError";

interface changeNameOfColumnParams extends columnUseCaseParams {
    newName: string
}

export function changeNameOfColumn({ columnList, column, newName }: changeNameOfColumnParams): columnModel[] {
    if(!newName.trim()) throw new BusinessError('No se pueden crear columnas sin nombre.')
    if(!isThisColumnNameWithinTheLimitOfLetters(newName)) throw new BusinessError('El nombre es demasiado largo.')
    const newColumnList = columnList.map(columnInBoard => {
        if(columnInBoard.id === column.id) {
            columnInBoard.name = newName
        }
        return columnInBoard
    })
    return newColumnList
}