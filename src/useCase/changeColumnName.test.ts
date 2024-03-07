import { boardModel } from "../models/board"
import { columnModel } from "../models/column"
import { changeNameOfColumn } from "./changeColumnName"

describe('Cambiar el nombre de una columna.', () => {
    test('Se debería cambiar el nombre de una columna.', () => { 
        const board: boardModel = {
            boardData: {
                id: '',
                name: ""
            },
            columnList: [
                {
                    id: "c1",
                    position: "1",
                    name: "",
                    taskList: []
                }
            ],
            archive: []
        }
        const column: columnModel = {
            id: "c1",
            name: "",
            position: "1",
            taskList: []
        }
        expect(changeNameOfColumn({ board, column, newName: "pipi" })).toStrictEqual({
                boardData: {
                    id: '',
                    name: ""
                },
            columnList: [
                {
                    id: "c1",
                    position: "1",
                    name: "pipi",
                    taskList: []
                }
            ],
            archive: []
        })
    })
})