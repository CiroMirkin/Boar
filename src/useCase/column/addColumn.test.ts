import { columnModel } from "../../models/column"
import { addColumnAtTheEnd } from "./addColumn"

describe('Crear una columna.', () => {
    test('Se debería añadir una columna al final del tablero.', () => {
        const columnList = [
            {
                id: "",
                name: "",
                position: "1",
            }
        ]
        const column: columnModel = {
            id: "",
            name: "",
            position: "2",
        }
      expect(addColumnAtTheEnd({ columnList, column })).toStrictEqual([
            {
                id: "",
                name: "",
                position: "1",
            },
            {
                id: "",
                name: "",
                position: "2",
            }
        ])  
    })
    
    test('Se debería corregir la posición de una columna si esta no lo tiene.', () => {
        const columnList = [
            {
                id: "",
                name: "",
                position: "1",

            }
        ]
        const column: columnModel = {
            id: "",
            name: "",
            position: "-1"
        }
        expect(addColumnAtTheEnd({ columnList, column })).toStrictEqual([
            {
                id: "",
                name: "",
                position: "1",
            },
            {
                id: "",
                name: "",
                position: "2",
            }
        ])
    })
})