import BusinessError from "@/errors/businessError";
import { columnModel } from "./column";

export type columnList = columnModel[]

export const defaultColumnList: columnModel[] = [
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

const limitOfColumns = 5

export const isItWithinTheLimitOfColumns = (columnList: columnList): true | BusinessError => {
  if (columnList.length > limitOfColumns) throw new BusinessError("Ya alcanzaste el limite de columnas.")
  return true
}