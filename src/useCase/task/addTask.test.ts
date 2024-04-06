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
    test("No debería haber mas de 15 tareas en una columna.  ESTA PRUEBA PODRÍA SER POCO CONFIABLE.", () => {
        const task = {
            id: '',
            descriptionText: '',
            columnPosition: '1',
        }
        const taskListInEachColumn: taskList[] = [ [], [], [] ]
        let firstColumnContent = new Array(16).fill(task)
        taskListInEachColumn[0] = firstColumnContent
        expect(() => {
            return addTaskInFirstColumn({ taskListInEachColumn, task })
        }).toThrow('Ya tienes muchas tareas en esta columna.')
    })
})