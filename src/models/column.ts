
export interface columnModel {
    id: string
    position: string,
    name: string
}

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

export function getBlankColumnWithoutPosition({ name }: { name: string }): columnModel {
  return {
    id: crypto.randomUUID(),
    position: '-1',
    name,
  }
}
