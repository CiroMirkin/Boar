import { addTaskToThisColumn } from "./addTask"
import { taskModel } from "./models/task"

describe('Agregar una tarea en la columna correspondiente', () => {
    test('Se puede agregar una tarea en la columna', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]
        const task = { descriptionText: "Hacer un cafe americano.", id: "1"}
    
        expect(addTaskToThisColumn("1", columns, task)).toEqual([{
            name: "",
            id: "1",
            taskList: [
                {
                    descriptionText: "Hacer un cafe americano.",
                    id: "1"
                }
            ]
        }])
    })
    
    test('No se puede agregar una tareas sin id', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]
        const task = {
            descriptionText: "Hacer un cafe americano.",
            id: ""
        }

        function taskWitoutId() {
            addTaskToThisColumn("1", columns, task)
        }
        expect(taskWitoutId).toThrow('No se puede agregar una tarea sin id')
    })
})