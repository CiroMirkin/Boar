import { editThisTask, getTheColumnIdWhereIsTheTask } from "./editTask"

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

describe('Funciones complementarias para editar una tarea', () => {
    test('Se debería retornar el id de la columna donde esta la tarea recibida como parámetro', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "", id: "1"}]
        }]
        expect(getTheColumnIdWhereIsTheTask(columns, "1")).toEqual("1")
    })
    test('Al no encontrarse una tarea se retorna un string vació', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "", id: "1"}]
        }]
        
        expect(getTheColumnIdWhereIsTheTask(columns, "2")).toEqual("")
    })
})