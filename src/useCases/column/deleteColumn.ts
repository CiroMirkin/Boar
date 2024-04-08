import { columnModel } from "@/models/column";
import { columnUseCaseParams } from "../useCase";
import BusinessError from "@/errors/businessError";

export function deleteThisColumn({ columnList, column }: columnUseCaseParams): columnModel[] {
    if(columnList.length <= 2) throw new BusinessError('No puedes tener menos de dos columnas.')

    return columnList.filter(columnInBoard => columnInBoard.id !== column.id)
}