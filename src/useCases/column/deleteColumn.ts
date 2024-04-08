import { columnModel } from "@/models/column";
import { columnUseCaseParams } from "../useCase";

export function deleteThisColumn({ columnList, column }: columnUseCaseParams): columnModel[] {
    if(columnList.length <= 2) throw new Error('No puedes tener menos de dos columnas.')

    return columnList.filter(columnInBoard => columnInBoard.id !== column.id)
}