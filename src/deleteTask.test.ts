import { delteTaskThisFromThisColumn } from "./deleteTask"

describe('Eliminar una tarea de la columna correspondiente', () => {
    test('Se puede eliminar una tarea de la columna', () => {
        const columns = [{
            name: "",
            id: "1",
            taskList: [{ descriptionText: "Hacer un cafe americano.", id: "1"}]
        }]
    
        expect(delteTaskThisFromThisColumn("1", "1", columns)).toEqual([{
            name: "",
            id: "1",
            taskList: []
        }])
    })

})