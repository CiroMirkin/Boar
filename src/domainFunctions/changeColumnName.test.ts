import { changeColumnName } from "./changeColumnName"

describe('Cambiar el nombre de una columna', () => {
    test('Debería cambiarse el nombre de la columna correspondiente', () => {
        const columns = [
            {
                name: "Esperando",
                id: "1",
                taskList: []
            }
        ]
        expect(changeColumnName({columnId: "1", newColumnName: "En espera", columns})).toEqual([
            {
                name: "En espera",
                id: "1",
                taskList: []
            }
        ])
    })
    test('Al no encontrarse la columna se retornan las mismas columnas que se recibieron sin ninguna modificación', () => {
        const columns = [
            {
                name: "Esperando",
                id: "1",
                taskList: []
            },
            {
                name: "Esperando",
                id: "4",
                taskList: []
            },
            {
                name: "Esperando",
                id: "3",
                taskList: []
            }
        ]
        expect(changeColumnName({columnId: "2", newColumnName: "En espera", columns})).toEqual([
            {
                name: "Esperando",
                id: "1",
                taskList: []
            },
            {
                name: "Esperando",
                id: "4",
                taskList: []
            },
            {
                name: "Esperando",
                id: "3",
                taskList: []
            }
        ])
    })
})