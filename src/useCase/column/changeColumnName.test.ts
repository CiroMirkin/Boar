import { columnModel } from "../../model/column"
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
})