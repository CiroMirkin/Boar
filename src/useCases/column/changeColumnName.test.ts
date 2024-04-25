import { columnModel } from "../../models/column"
import { changeNameOfColumn } from "./changeColumnName"

describe('Cambiar el nombre de una columna.', () => {
    test('Se debería cambiar el nombre de la columna indicada.', () => { 
        const column: columnModel = {
            id: "c1",
            name: "",
            position: "1",
        }
        const columnList: columnModel[] = [
            {...column}
        ]
        expect(changeNameOfColumn({ columnList, column, newName: "pipi" })).toStrictEqual([
            {
                id: "c1",
                position: "1",
                name: "pipi",
            }
        ])
    })

    test("No se debería poder cambiar el nombre de una columna por un string vacio.", () => {
        const column: columnModel = {
            id: "c1",
            name: "",
            position: "1",
        }
        const columnList: columnModel[] = [
            {...column}
        ]
        expect(() => {
            return changeNameOfColumn({ columnList, column, newName: " "})
        }).toThrow('No se pueden crear columnas sin nombre.')
    })
})