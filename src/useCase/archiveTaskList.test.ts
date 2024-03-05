import { taskNull } from "../models/task"
import { archiveTaskListInColumn } from "./archiveTaskList"
import { getFullDate } from "../auxiliaryFunction/getTime"

describe("Archivar lista de tareas.", () => {
    test("Se deberían archivar todas las tareas de la columna indicada.", () => {
        const task = {...taskNull}
        const board = {
            boardData: {
                id: '0',
                name: "Tablero básico"
            },
            columnList: [
                {
                    id: "c1",
                    name: "Pendientes",
                    position: "1",
                    taskList: []
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
                    taskList: [{...task}]
                },
            ],
            archive: []
        }
        expect(archiveTaskListInColumn({ board, columnIndex: 2 })).toStrictEqual(
            {
                boardData: {
                    id: '0',
                    name: "Tablero básico"
                },
                columnList: [
                    {
                        id: "c1",
                        name: "Pendientes",
                        position: "1",
                        taskList: []
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
                ],
                archive: [
                    {
                        date: (getFullDate()),
                        tasklist: [
                            {
                                id: '',
                                descriptionText: '',
                                columnPosition: '1',
                                highlight: false
                            }
                        ]
                    }
                ]
            }
        )
    })
})