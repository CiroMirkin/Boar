import { moveThisTask } from "./moveTask"

describe('Mover una tarea entre columnas', () => {
    test('Una tarea debería moverse a la columna siguiente', () => {
        const task = { 
            id: "1",
            descriptionText: "", 
            columnPosition: '1',
        }
        const board = {
            boardData: {
                id: "",
                name: "",
            },
            columnList: [
                {
                    id: "c1",
                    name: "",
                    position: "1",
                    taskList: [
                        {...task}
                    ],
                },
                {
                    id: "c2",
                    name: "",
                    position: "2",
                    taskList: [],
                }
            ]
        }

        expect(moveThisTask({ task, to: 'next-column', board})).toEqual({
            boardData: {
                id: "",
                name: "",
            },
            columnList: [
                {
                    id: "c1",
                    name: "",
                    position: "1",
                    taskList: [],
                },
                {
                    id: "c2",
                    name: "",
                    position: "2",
                    taskList: [
                        { 
                            id: "1",
                            descriptionText: "", 
                            columnPosition: '2',
                        }
                    ],
                }
            ]
        })
    })

    test('Una tarea debería moverse a la columna anterior', () => {
        const task = { 
            id: "1",
            descriptionText: "", 
            columnPosition: '2',
        }
        const board = {
            boardData: {
                id: "",
                name: "",
            },
            columnList: [
                {
                    id: "c1",
                    name: "",
                    position: "1",
                    taskList: [],
                },
                {
                    id: "c2",
                    name: "",
                    position: "2",
                    taskList: [
                        {...task}
                    ],
                }
            ]
        }

        expect(moveThisTask({ task, to: 'prev-column', board})).toEqual({
            boardData: {
                id: "",
                name: "",
            },
            columnList: [
                {
                    id: "c1",
                    name: "",
                    position: "1",
                    taskList: [
                        { 
                            id: "1",
                            descriptionText: "", 
                            columnPosition: '1',
                        }
                    ],
                },
                {
                    id: "c2",
                    name: "",
                    position: "2",
                    taskList: [],
                }
            ]
        })
    })
})
