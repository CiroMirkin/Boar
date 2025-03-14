import { deleteThisTask } from './deleteTask'
import { expect } from 'vitest';

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
