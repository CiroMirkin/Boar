import { cleanLastTaskList, deleteThisTaskColumn } from './deleteTaskList'
import { expect } from 'vitest'

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
		const taskBoard = [
			{
				id: '1',
				status: '',
				tasks: [],
			},
			{
				id: '2',
				status: '',
				tasks: [
					{
						id: '',
						descriptionText: '',
					},
				],
			},
			{
				id: '3',
				status: '',
				tasks: [],
			},
		]
		expect(deleteThisTaskColumn({ taskBoard, id: '2' })).toStrictEqual([
			{
				id: '1',
				status: '',
				tasks: [],
			},
			{
				id: '3',
				status: '',
				tasks: [],
			},
		])
	})
})
