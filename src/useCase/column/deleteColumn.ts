import { columnModel } from "@/models/column";
import { columnUseCaseParams } from "../useCase";

export function deleteThisColumn({ columnList, column }: columnUseCaseParams): columnModel[] {
    if(columnList.length <= 3) throw new Error('Para poder eliminar una columna debe haber mas de tres.')

    return columnList.filter(columnInBoard => columnInBoard.id !== column.id)
}