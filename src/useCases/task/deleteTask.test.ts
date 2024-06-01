import { deleteThisTask } from './deleteTask'

describe('Eliminar una tarea.', () => {
	test('Se debería eliminar la tarea elegida de su columna.', () => {
		const task = {
			id: '',
			descriptionText: '',
			columnPosition: '1',
		}
		const taskListInEachColumn = [[{ ...task }], [], []]
		expect(deleteThisTask({ taskListInEachColumn, task })).toStrictEqual([[], [], []])
	})
})
