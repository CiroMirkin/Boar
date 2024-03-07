import { boardModel } from "../models/board"
import { columnModel } from "../models/column"
import { deleteThisColumn } from "./deleteColumn.ts"

describe('Eliminar columna.', () => {
    test('Se debería eliminar la columna indicada.', () => {
        const board: boardModel = {
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
                },
                {
                    id: "c3",
                    name: "",
                    position: "3",
                    taskList: []
                },
                {
                    id: "",
                    name: "",
                    position: "4",
                    taskList: []
                },
            ],
            archive: []
        }
        const column: columnModel = {
            id: "c3",
            name: "",
            position: "3",
            taskList: []
        }
        expect(deleteThisColumn({ board, column })).toStrictEqual({
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
                },
                {
                    id: "",
                    name: "",
                    position: "4",
                    taskList: []
                },
            ],
            archive: []
        })
    })
})