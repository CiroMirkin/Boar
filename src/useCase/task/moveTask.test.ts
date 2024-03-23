import { moveThisTask } from "./moveTask"

describe('Mover una tarea entre columnas', () => {
    test('Una tarea debería moverse a la columna siguiente', () => {
        const task = { 
            id: "1",
            descriptionText: "", 
            columnPosition: '1',
        }
        const taskListInEachColumn = [ [{...task}], []]

        expect(moveThisTask({ task, to: 'next-column', taskListInEachColumn})).toEqual([
            [], 
            [{ 
                id: "1",
                descriptionText: "", 
                columnPosition: '2',
            }]
        ])
    })

    test('Una tarea debería moverse a la columna anterior', () => {
        const task = { 
            id: "1",
            descriptionText: "", 
            columnPosition: '2',
        }
        const taskListInEachColumn = [ [], [{...task}]]

        expect(moveThisTask({ task, to: 'prev-column', taskListInEachColumn})).toEqual([
            [{ 
                id: "1",
                descriptionText: "", 
                columnPosition: '2',
            }],
            []
        ])
    })

    test('Al intentar mover una tarea en la primer columna a la columna anterior la tarea se quedara donde esta', () => {
        const task = { 
            id: "1",
            descriptionText: "", 
            columnPosition: '1',
        }
        const taskListInEachColumn = [ [{...task}], []]

        expect(moveThisTask({ task, to: 'prev-column', taskListInEachColumn})).toEqual([
            [{ 
                id: "1",
                descriptionText: "", 
                columnPosition: '1',
            }],
            []
        ])
    })
})
