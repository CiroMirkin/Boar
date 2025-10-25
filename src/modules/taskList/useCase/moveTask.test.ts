import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { moveThisTask, moveThisTaskToTheNextColumn } from './moveTask'
import { expect } from 'vitest'

describe('Mover una tarea entre columnas', () => {
	test('Una tarea debería moverse a la columna siguiente', () => {
		const task = {
			id: '1',
			descriptionText: 'pipi',
			columnPosition: '1',
		}
		const taskListInEachColumn = [[{ ...task }], []]

		expect(moveThisTask({ task, to: 'next-column', taskListInEachColumn })).toEqual([
			[],
			[
				{
					id: '1',
					descriptionText: 'pipi',
					columnPosition: '2',
				},
			],
		])
	})

	test('Una tarea debería moverse a la columna anterior', () => {
		const task = {
			id: '1',
			descriptionText: 'pipi',
			columnPosition: '2',
		}
		const taskListInEachColumn = [[], [{ ...task }]]

		expect(moveThisTask({ task, to: 'prev-column', taskListInEachColumn })).toEqual([
			[
				{
					id: '1',
					descriptionText: 'pipi',
					columnPosition: '1',
				},
			],
			[],
		])
	})

	test('Al intentar mover una tarea en la primer columna a la columna anterior la tarea se quedara donde esta', () => {
		const task = {
			id: '1',
			descriptionText: 'pipi',
			columnPosition: '1',
		}
		const taskListInEachColumn = [[{ ...task }], []]

		expect(moveThisTask({ task, to: 'prev-column', taskListInEachColumn })).toEqual([
			[
				{
					id: '1',
					descriptionText: 'pipi',
					columnPosition: '1',
				},
			],
			[],
		])
	})
})

describe('Se respetan los limites de una lista de tareas', () => {
	test('No se debería poder mover una tarea a una columna llena.', () => {
		const task = {
			id: '1',
			descriptionText: 'tarea',
			columnPosition: '1',
		}

		// Crear una columna con la tarea que queremos mover
		const firstColumn = [{ ...task }]

		// Crear una segunda columna llena (9 tareas, porque al mover una más llegará a 10)
		const dummyTask = {
			id: '2',
			descriptionText: 'tarea dummy',
			columnPosition: '2',
		}
		const secondColumnContent = new Array(10).fill(null).map((_, i) => ({
			...dummyTask,
			id: `dummy-${i}`,
		}))

		const taskListInEachColumn: TaskListInEachColumn = [firstColumn, secondColumnContent, []]

		expect(() => {
			moveThisTaskToTheNextColumn({ taskListInEachColumn, task })
		}).toThrow('La columna esta llena.')
	})
})
