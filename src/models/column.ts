export interface columnModel {
    position: string,
    name: string
}

export const defaultColumnList: columnModel[] = [
    {
      name: "Pendientes",
      position: "1"
    },
    {
      name: "Procesando",
      position: "2",
    },
    {
      name: "Terminado",
      position: "3",
    },
]