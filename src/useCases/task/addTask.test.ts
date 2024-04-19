import { TaskList } from "@/models/taskListInEachColumn"
import { addTaskInFirstColumn } from "./addTask"

describe("Crear una tarea.", () => {
    test("Se debería agregar la tarea recibida a la primer columna del tablero.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const taskListInEachColumn: TaskList[] = [ [], [], [] ]
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