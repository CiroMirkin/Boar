import { TaskListInEachColumn } from '@/columnList/taskList/models/taskList'
import { moveThisTask, moveThisTaskToTheNextColumn } from './moveTask'

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
	test('No se debería poder mover una tarea a una columna llena. PRUEBA POCO CONFIABLE.', () => {
		const task = {
			id: '',
			descriptionText: 'tarea',
			columnPosition: '1',
		}
		const taskListInEachColumn: TaskListInEachColumn = [[], [], []]
		const secondColumnContent = new Array(10).fill(task)
		taskListInEachColumn[1] = secondColumnContent

		expect(() => {
			return moveThisTaskToTheNextColumn({ taskListInEachColumn, task })
		}).toThrow('La columna esta llena.')
	})
})
