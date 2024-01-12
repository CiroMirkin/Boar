import { addTaskToThisColumn } from "./addTask"

describe('Agregar una tarea en la columna correspondiente', () => {
    test('Se puede agregar una tarea en la columna', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]
        const task = { 
            descriptionText: "Hacer un cafe americano.", 
            id: "1",
            column: {
                columnId: '1',
                columnIndex: 0
            }
        }
    
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
            id: "",
            column: {
                columnId: '1',
                columnIndex: 0
            }
        }

        function taskWitoutId() {
            addTaskToThisColumn("1", columns, task)
        }
        expect(taskWitoutId).toThrow('No se puede agregar una tarea sin id')
    })
})