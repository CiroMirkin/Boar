import { editThisTask } from "./editTask"

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