import { columnModel } from "../models/column"
import { addColumnAtTheEnd } from "./addColumn"

describe('Crear una columna.', () => {
    test('Se debería añadir una columna al final del tablero.', () => {
        const board = {
            boardData: {
                id: '0',
                name: "Tablero básico"
            },
            columnList: [
                {
                    id: "",
                    name: "",
                    position: "1",
                    taskList: []
                },
                {
                    id: "",
                    name: "",
                    position: "2",
                    taskList: []
                },
                {
                    id: "",
                    name: "",
                    position: "3",
                    taskList: []
                }
            ],
            archive: []
            }
        const column: columnModel = {
            id: '',
            position: '4',
            name: '',
            taskList: []
        }
      expect(addColumnAtTheEnd({ board, column })).toStrictEqual({
        boardData: {
            id: '0',
            name: "Tablero básico"
        },
        columnList: [
            {
                id: "",
                name: "",
                position: "1",
                taskList: []
            },
            {
                id: "",
                name: "",
                position: "2",
                taskList: []
            },
            {
                id: "",
                name: "",
                position: "3",
                taskList: []
            },
            {
                id: '',
                position: '4',
                name: '',
                taskList: []
            }
        ],
        archive: []
        })  
    })
    
    test('Se debería corregir la posición de una columna si esta no lo tiene.', () => {
        const board = {
            boardData: {
                id: '',
                name: ""
            },
            columnList: [
                {
                    id: "",
                    name: "",
                    position: "1",
                    taskList: []
                }
            ],
            archive: []
        }
        const column: columnModel = {
            id: "",
            name: "",
            position: "-1",
            taskList: []
        }
        expect(addColumnAtTheEnd({ board, column })).toStrictEqual({
            boardData: {
                id: '',
                name: ""
            },
            columnList: [
                {
                    id: "",
                    name: "",
                    position: "1",
                    taskList: []
                },
                {
                    id: "",
                    name: "",
                    position: "2",
                    taskList: []
                }
            ],
            archive: []
        })
    })
})