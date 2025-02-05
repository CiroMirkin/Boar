import { cleanLastTaskList, deleteTheTaskListInThisIndex } from './deleteTaskList'

describe('Eliminar una lista de tareas.', () => {
	test('Se debería eliminar la última lista de tareas.', () => {
		const taskListInEachColumn = [
			[],
			[],
			[
				{
					id: '',
					descriptionText: '',
					columnPosition: '1',
				},
			],
		]
		expect(cleanLastTaskList({ taskListInEachColumn })).toStrictEqual([[], [], []])
	})

	test('Se debería eliminar la lista de tareas indicada.', () => {
		const taskListInEachColumn = [
			[],
			[
				{
					id: '',
					descriptionText: '',
					columnPosition: '1',
				},
			],
			[],
		]
		expect(deleteTheTaskListInThisIndex({ taskListInEachColumn, index: 1 })).toStrictEqual([
			[],
			[],
		])
	})
})
