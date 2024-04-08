import { columnModel } from "../../models/column.ts"
import { deleteThisColumn } from "./deleteColumn.ts"

describe('Eliminar columna.', () => {
    test('Se debería eliminar la columna indicada.', () => {
        const column: columnModel = {
            id: "c4",
            name: "",
            position: "4",
        }
        const columnList: columnModel[] = [
            {
                id: "",
                name: "",
                position: "1",
            },
            {
                id: "",
                name: "",
                position: "2",
            },
            {
                id: "c3",
                name: "",
                position: "3",
            },
            {...column},
        ]

        expect(deleteThisColumn({ columnList, column })).toStrictEqual([
            {
                id: "",
                name: "",
                position: "1",
            },
            {
                id: "",
                name: "",
                position: "2",
            },
            {
                id: "c3",
                name: "",
                position: "3",
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
                id: "",
                name: "",
                position: "2",
            },
            {
                id: "c3",
                name: "",
                position: "3",
            },
        ]
        const column: columnModel = {
            id: "c3",
            name: "",
            position: "3",
        }
        expect(() => {
            return deleteThisColumn({ columnList, column })
        }).toThrow('No puedes tener menos de dos columnas.')

    })
})