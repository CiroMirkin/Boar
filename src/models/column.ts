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

export const isThisColumnNameValid = (columnName: string): boolean => !!columnName.trim()

export function getBlankColumnWithoutPosition({ name }: { name: string }): columnModel {
  if(!isThisColumnNameValid(name)) throw new BusinessError('No se pueden crear columnas sin nombre.')
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