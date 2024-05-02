import { CompleteColumn } from "./completeColumn";

export type ListOfCompleteColumns = CompleteColumn[]

export const defaultCompleteColumnList: ListOfCompleteColumns = [
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