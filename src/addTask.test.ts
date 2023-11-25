import { addTaskToThisColumn } from "./addTask"
import { taskModel } from "./models/task"

describe('Agregar una tarea en la columna correspondiente', () => {
    test('Se puede agregar una tarea en la columna', () => {
        const column = {
                name: "",
                id: "1",
                taskList: []
            }
        
        const task: taskModel = {
            descriptionText: "Hacer un cafe americano.",
            id: "1"
        }
    
        expect(addTaskToThisColumn(column, task)).toEqual({
            name: "",
            id: "1",
            taskList: [
                {
                    descriptionText: "Hacer un cafe americano.",
                    id: "1"
                }
            ]
        })
    })
    
    test('No se puede agregar una tareas sin id', () => {
        const columnList = {
            name: "Pendintes",
            id: "1",
            taskList: []
        }
        const task: taskModel = {
            descriptionText: "Hacer un cafe americano.",
            id: ""
        }
        function taskWitoutId() {
            addTaskToThisColumn(columnList, task)
        }
    
        expect(taskWitoutId).toThrow('No se puede agregar una tarea sin id')
    })
})