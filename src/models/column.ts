import { taskList } from "./task"

export interface columnModel {
    id: string
    position: string,
    name: string
    taskList: taskList
}

export const defaultColumnList: columnModel[] = [
    {
      id: "c1",
      name: "Pendientes",
      position: "1",
      taskList: []
    },
    {
      id: "c2",
      name: "Procesando",
      position: "2",
      taskList: []
    },
    {
      id: "c3",
      name: "Terminado",
      position: "3",
      taskList: []
    },
]

export function createColumnWithoutPosition({ name }: { name: string }): columnModel {
  return {
    id: crypto.randomUUID(),
    position: '-1',
    name,
    taskList: []
  }
}
