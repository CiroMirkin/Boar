import BusinessError from "@/errors/businessError";
import { Column } from "./column";

export type ColumnList = Column[]

export const defaultColumnList: Column[] = [
  {
    id: "c1",
    name: "Pendientes",
    position: "1",
  },
  {
    id: "c2",
    name: "Procesando",
    position: "2",
  },
  {
    id: "c3",
    name: "Terminado",
    position: "3",
  },
]

const limitOfColumns = 6

export const isItWithinTheLimitOfColumns = (columnList: ColumnList): true | BusinessError => {
  if (columnList.length > limitOfColumns) throw new BusinessError("Alcanzaste el limite de columnas.")
  return true
}