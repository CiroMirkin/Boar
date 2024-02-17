import { defaultBoard } from "../models/board"
import { defaultColumnList } from "../models/column"
import { addTaskInFirstColumn } from "./addTaskInFirstColumn"

describe("", () => {
    test("", () => {
        const board = defaultBoard
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        expect(addTaskInFirstColumn({ board, task })).toStrictEqual({
            boardData: {
                id: '0',
                name: "Tablero básico"
            },
            columnList: defaultColumnList,
            tasksInColumns: [
                [
                    {
                        id: '',
                        descriptionText: '',
                        columnPosition: '1',
                    }
                ], 
                [], []
            ]
        })
    })
})