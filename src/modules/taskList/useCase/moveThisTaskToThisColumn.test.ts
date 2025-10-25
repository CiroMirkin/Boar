import { moveThisTaskToThisColumn } from './moveThisTaskToThisColumn'
describe('Mover una tarea determinada a una columna determinada.', () => {
	test('Mover una tarea desde la segunda columna hacia la tercer columna.', () => {
		const taskListInEachColumnDataInput = [
			[],
			[{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '2' }],
			[{ id: 'fbc5df48', descriptionText: 'cafe iwi', columnPosition: '3' }],
		]
		const taskData = taskListInEachColumnDataInput[1][0]
		const taskListInEachColumnDataOutput = [
			[],
			[],
			[
				{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '3' },
				{ id: 'fbc5df48', descriptionText: 'cafe iwi', columnPosition: '3' },
			],
		]

		expect(
			moveThisTaskToThisColumn({
				taskListOfColumns: taskListInEachColumnDataInput,
				task: taskData,
				newColumnPosition: '3',
			})
		).toEqual(taskListInEachColumnDataOutput)
	})

	test('Mover una tarea hacia una columna vacia.', () => {
		const taskListInEachColumnDataInput = [
			[{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '1' }],
			[],
			[],
		]
		const taskData = taskListInEachColumnDataInput[0][0]
		const taskListInEachColumnDataOutput = [
			[],
			[],
			[{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '3' }],
		]

		expect(
			moveThisTaskToThisColumn({
				taskListOfColumns: taskListInEachColumnDataInput,
				task: taskData,
				newColumnPosition: '3',
			})
		).toEqual(taskListInEachColumnDataOutput)
	})

	test('Mover una tarea multiples veces.', () => {
		const taskListInEachColumnDataInput = [
			[{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '1' }],
			[{ id: 'fbc5df48', descriptionText: 'cafe iwi', columnPosition: '2' }],
			[],
		]
		const taskData = taskListInEachColumnDataInput[0][0]
		const taskListInEachColumnDataOutput = [
			[],
			[{ id: 'fbc5df48', descriptionText: 'cafe iwi', columnPosition: '2' }],
			[{ id: 'f4ec6bb9', descriptionText: 'cafe', columnPosition: '3' }],
		]

		const newInputData = moveThisTaskToThisColumn({
			taskListOfColumns: taskListInEachColumnDataInput,
			task: taskData,
			newColumnPosition: '2',
		})

		const newTaskData = newInputData[1][0]

		expect(
			moveThisTaskToThisColumn({
				taskListOfColumns: newInputData,
				task: newTaskData,
				newColumnPosition: '3',
			})
		).toEqual(taskListInEachColumnDataOutput)
	})
})
