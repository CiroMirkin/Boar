import { addTaskToFirstColumn } from "./addTask"
import { taskModel } from "./models/task"

describe('Agregar una tarea en la columna correspondiente', () => {
    test('Se puede agregar una tarea en la primer columna', () => {
        const columnList = [
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "1",
                taskList: []
            }
        ]
        
        const task: taskModel = {
            descriptionText: "Hacer un cafe americano.",
            id: "1"
        }
    
        expect(addTaskToFirstColumn(columnList, task)).toEqual([
            {
                name: "",
                id: "1",
                taskList: [
                    {
                        descriptionText: "Hacer un cafe americano.",
                        id: "1"
                    }
                ]
            },
            {
                name: "",
                id: "1",
                taskList: []
            },
            {
                name: "",
                id: "1",
                taskList: []
            }
        ])
    })
    
    test('No se puede agregar una tareas sin id', () => {
        const columnList = [{
            name: "Pendintes",
            id: "1",
            taskList: []
        }]
        const task: taskModel = {
            descriptionText: "Hacer un cafe americano.",
            id: ""
        }
        function taskWitoutId() {
            addTaskToFirstColumn(columnList, task)
        }
    
        expect(taskWitoutId).toThrow('No se puede agregar una tarea sin id')
    })
    
    test('No puede haber menos de tres columnas en la lista de columnas', () => {
        const columnList = [
            {
            name: "Pendintes",
            id: "1",
            taskList: []
            },
            {
                name: "Terminadas",
                id: "1",
                taskList: []
            },
        ]
        const task: taskModel = {
            descriptionText: "Hacer un cafe americano.",
            id: "1"
        }
    
        function thereAreLessThanThreeColumns() {
            addTaskToFirstColumn(columnList, task)
        }
    
        expect(thereAreLessThanThreeColumns).toThrow('No puede haber menos de tres columnas')
    })
})