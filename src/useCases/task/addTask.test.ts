import { TaskList } from "@/models/taskListInEachColumn"
import { addTaskInFirstColumn, addTaskInTheLastColumn } from "./addTask"

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

describe("Agregar una tarea a la última columna.", () => {
    test("Se debería agregar la tarea indicada a la última columna.", () => {
        const task = {
            id: '23hlvi514vli',
            descriptionText: '',
            columnPosition: '2',
        }
        const taskListInEachColumn: TaskList[] = [ [], [] ]
        expect(addTaskInTheLastColumn({ taskListInEachColumn, task })).toStrictEqual([ 
            [], 
            [
                {
                    id: '23hlvi514vli',
                    descriptionText: '',
                    columnPosition: '2',
                }
            ] 
        ])
    })
})