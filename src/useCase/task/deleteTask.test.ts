import { deleteThisTask } from "./deleteTask"

describe("Eliminar una tarea.", () => {
    test("Se debería eliminar la tarea elegida de su columna.", () => {
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
        }
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        expect(deleteThisTask({ board, task })).toStrictEqual({
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
            ]
        })
    })
})