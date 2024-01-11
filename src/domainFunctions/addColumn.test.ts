import { getColumn } from "./addColumn"

describe('Añadir una columna a la tabla', () => {
    test('Se debería añadir una nueva columna al final de la tabla', () => {
        const columns = [{name: "En espera", id: "1", taskList: []}]
        expect(getColumn({ columnName: 'Para revision', columns })).toEqual({name: "Para revision", id: "2", taskList: []})
    })
})