import { moveTask } from "./moveTask"

describe('Mover una tarea entre columnas', () => {
    test('Una tarea debería moverse a la columna siguiente', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: [{ descriptionText: "string", id: "1"}]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ]

        expect(moveTask({ taskId, to: 'next-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [{ descriptionText: "string", id: "1"}]
            }
        ])
    })

    test('Una tarea debería moverse a la columna anterior', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [{ descriptionText: "string", id: "1"}]
            }
        ]

        expect(moveTask({ taskId, to: 'prev-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: [{ descriptionText: "string", id: "1"}]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ])
    })

    test('Al intentar mover una tarea en la última columna a la columna siguiente la tarea se quedara donde esta', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [{ descriptionText: "string", id: "1"}]
            }
        ]

        expect(moveTask({ taskId, to: 'next-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "2",
                taskList: [{ descriptionText: "string", id: "1"}]
            }
        ])
    })

    test('Al intentar mover una tarea en la primer columna a la columna anterior la tarea se quedara donde esta', () => {
        const taskId = "1"
        const columns = [
            {
                name: "",
                id: "1",
                taskList: [{ descriptionText: "string", id: "1"}]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ]

        expect(moveTask({ taskId, to: 'prev-column', columns})).toEqual([
            {
                name: "",
                id: "1",
                taskList: [{ descriptionText: "string", id: "1"}]
            },
            {
                name: "",
                id: "2",
                taskList: []
            }
        ])
    })
})
