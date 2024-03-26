import { deleteLastTaskList } from "./deleteTaskList"

describe("Eliminar una lista de tareas.", () => {
    test("Se debería eliminar la última lista de tareas.", () => {       
        const taskListInEachColumn = [
            [], 
            [], 
            [
                {
                    id: '',
                    descriptionText: '',
                    columnPosition: '1',
                }
            ]
        ]
        expect(deleteLastTaskList({ taskListInEachColumn })).toStrictEqual([ [], [], [] ])
    })
})