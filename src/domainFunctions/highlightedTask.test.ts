import { taskModel } from "../models/task"
import { setThisTaskAsHighlightedTask } from "./highlightedTask"

describe('Resaltar una tarea', () => {
    test('Se debería poder resaltar una tarea', () => {
        const task: taskModel = {
            descriptionText: '',
            id: '',
            column: {
                columnId: '',
                columnIndex: 0
            }
        }
        expect(setThisTaskAsHighlightedTask({ task })).toContain({ highlight: true })
    })
})