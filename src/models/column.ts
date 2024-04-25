import BusinessError from "@/errors/businessError"

export interface columnModel {
  id: string
  position: string,
  name: string
}

export const columnNull: columnModel = {
  id: "",
  position: "",
  name: ""
}

export const isThisColumnNameWithinTheLimitOfLetters = (boardName: string): boolean => boardName.length < 30
export const isThisColumnNameValid = (name: string): true | BusinessError => {
  if(!name.trim()) throw new BusinessError('No se pueden crear columnas sin nombre.')
  if(!isThisColumnNameWithinTheLimitOfLetters(name)) throw new BusinessError('El nombre es demasiado largo.')
  return true
} 

export function getBlankColumnWithoutPosition({ name }: { name: string }): columnModel {
  isThisColumnNameValid(name)
  return {
    id: crypto.randomUUID(),
    position: '-1',
    name,
  }
}

export const isThisTheFirstColumn = (column: columnModel, columnList: columnModel[]): boolean => {
  if (columnList[0].id === column.id) {
    return true
  }
  return false
}

export const isThisTheLastColumn = (column: columnModel, columnList: columnModel[]): boolean => {
  if (columnList[columnList.length - 1].id === column.id) {
    return true
  }
  return false
}

export const getIndexOfColumnInColumnList = (position: string): number => (Number(position) - 1);