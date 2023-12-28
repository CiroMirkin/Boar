import { addColumnAtTheEnd } from "./addColumn"

describe('Añadir una columna a la tabla', () => {
    test('Se debería añadir una nueva columna al final de la tabla', () => {
        expect(addColumnAtTheEnd('Para revision', [{name: "", id: "1", taskList: []}])).toEqual([
            {name: "En espera", id: "1", taskList: []},
            {name: "Para revision", id: "2", taskList: []},
        ])
    })
})