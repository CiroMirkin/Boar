import { columnModel } from "../../models/column.ts"
import { deleteThisColumn } from "./deleteColumn.ts"

describe('Eliminar columna.', () => {
    test('Se debería eliminar la columna indicada.', () => {
        const column: columnModel = {
            id: "c2",
            name: "",
            position: "2",
        }
        const columnList: columnModel[] = [
            {
                id: "",
                name: "pipi",
                position: "1",
            },
            {...column},
            {
                id: "",
                name: "pupu",
                position: "3",
            },
        ]

        expect(deleteThisColumn({ columnList, column })).toStrictEqual([
            {
                id: "",
                name: "pipi",
                position: "1",
            },
            {
                id: "",
                name: "pupu",
                position: "2",
            },
        ])
    })

    test('Debería poderse eliminar una columna solo cuando hay mas de dos.', () => {
        const columnList: columnModel[] = [
            {
                id: "",
                name: "",
                position: "1",
            },
            {
                id: "c2",
                name: "",
                position: "2",
            }
        ]
        const column: columnModel = {
            id: "c2",
            name: "",
            position: "2",
        }
        expect(() => {
            return deleteThisColumn({ columnList, column })
        }).toThrow('No puedes tener menos de dos columnas.')

    })
})