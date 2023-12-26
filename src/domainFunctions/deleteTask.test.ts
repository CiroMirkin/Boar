import { deleteThisTaskFromThisColumn } from "./deleteTask"

describe('Eliminar una tarea de la columna correspondiente', () => {
    test('Se puede eliminar una tarea de la columna', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "Hacer un cafe americano.", id: "1"}]
        }]
    
        expect(deleteThisTaskFromThisColumn("1", "1", columns)).toEqual([{
            name: "",
            id: "1",
            taskList: []
        }])
    })

    test('No se puede eliminar una tarea de una columna vacía', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]
    
        expect(() => deleteThisTaskFromThisColumn("1", "1", columns)).toThrow('No se puede eliminar una tarea de una columna vacía')
    })
    
    test('No se puede eliminar una tarea con un ID en blanco', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]

        expect(() => deleteThisTaskFromThisColumn("", "1", columns)).toThrow('No se puede eliminar una tarea con un id en blanco')
    })

    test('No se puede eliminar una tarea de una columna con un ID en blanco', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: []
        }]

        expect(() => deleteThisTaskFromThisColumn("1", "", columns)).toThrow('No se puede eliminar una tarea de una columna con un id en blanco')
    })
})