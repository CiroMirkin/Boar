import { defaultBoard } from "../models/board"
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
            columnList: [
                {
                    id: "c1",
                    name: "Pendientes",
                    position: "1",
                    taskList: [{
                        id: '',
                        descriptionText: '',
                        columnPosition: '1',
                    }]
                },
                {
                    id: "c2",
                    name: "Procesando",
                    position: "2",
                    taskList: []
                },
                {
                    id: "c3",
                    name: "Terminado",
                    position: "3",
                    taskList: []
                },
            ]
        })
    })
})