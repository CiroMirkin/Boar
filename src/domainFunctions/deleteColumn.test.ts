import { deleteThisColumnFromColumns } from "./deleteColumn"

describe('Eliminar una columna del tablero', () => {
    test('Se debería poder eliminar una columna', () => {
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: []
            },
            {
                name: "",
                id: "3",
                taskList: []
            },{
                name: "",
                id: "4",
                taskList: []
            },
        ]
        expect(deleteThisColumnFromColumns({ columnId: "4", columns })).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: []
            },
            {
                name: "",
                id: "3",
                taskList: []
            }
        ])
    })

    test('No se debería poder eliminar una columna si solo hay tres columnas', () => {
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: []
            },
            {
                name: "",
                id: "3",
                taskList: []
            }
        ]
        
        function thereAreThreeColumns() {
            deleteThisColumnFromColumns({ columnId: "1", columns })
        }
        expect(thereAreThreeColumns).toThrow('No se puede eliminar una columna si hay tres columnas')
    })
})