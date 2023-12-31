import { editThisTask, getTheColumnIndexWhereIsTheTask } from "./editTask"

describe('Editar el contenido de una tarea', () => {
    test('Se deberia poder editar el texto de una tarea', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "Hacer un cafe americano.", id: "1"}]
        }]
        expect(editThisTask({ taskId: "1", newTaskText: "Patito", columns })).toEqual([{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "Patito", id: "1"}]
        }])
    })
})

describe('Función complementaria: Búsqueda del index de la columna donde una la tarea', () => {
    test('Se debería retornar el index de la columna donde esta la tarea recibida como parámetro', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "", id: "1"}]
        }]
        expect(getTheColumnIndexWhereIsTheTask(columns, "1")).toEqual(0)
    })
    test('Al no encontrarse una tarea se retorna -1', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "", id: "1"}]
        }]
        
        expect(getTheColumnIndexWhereIsTheTask(columns, "2")).toEqual(-1)
    })
})