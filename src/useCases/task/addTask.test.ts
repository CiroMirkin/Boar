import { taskList } from "@/models/task"
import { addTaskInFirstColumn } from "./addTask"

describe("Crear una tarea.", () => {
    test("Se debería agregar la tarea recibida a la primer columna del tablero.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const taskListInEachColumn: taskList[] = [ [], [], [] ]
        expect(addTaskInFirstColumn({ taskListInEachColumn, task })).toStrictEqual([ 
            [
                {
                    id: '',
                    descriptionText: '',
                    columnPosition: '1',
                }
            ], 
            [], 
            [] 
        ])
    })
})