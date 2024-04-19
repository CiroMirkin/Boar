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

