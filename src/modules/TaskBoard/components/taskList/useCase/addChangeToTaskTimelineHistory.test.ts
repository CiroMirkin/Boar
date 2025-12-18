import { addChangeToTaskTimelineHistory } from './addChangeToTaskTimelineHistory'
import { taskModel } from '@/modules/TaskBoard/model/task'
import { vi } from 'vitest'

const emptyTaskForTest: taskModel = {
	id: '',
	descriptionText: '',
}

describe('addChangeToTaskTimelineHistory', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('Es posible agregar un nuevo registro de cambio a una tarea sin historial previo.', () => {
		const mockDate = new Date('2024-01-15T10:00:00.000Z')
		vi.spyOn(global, 'Date').mockImplementation(() => mockDate as Date)

		const task: taskModel = {
			...emptyTaskForTest,
		}

		const result = addChangeToTaskTimelineHistory({
			task,
			columnName: 'En Progreso',
		})

		expect(result).toStrictEqual([
			{
				date: mockDate,
				columnName: 'En Progreso',
			},
		])
	})

	test('Es posible agregar un nuevo registro de cambio a una tarea con historial vacío.', () => {
		const mockDate = new Date('2024-01-15T10:00:00.000Z')
		vi.spyOn(global, 'Date').mockImplementation(() => mockDate as Date)

		const task: taskModel = {
			...emptyTaskForTest,
			timelineHistory: [],
		} as taskModel

		const result = addChangeToTaskTimelineHistory({
			task,
			columnName: 'Completado',
		})

		expect(result).toStrictEqual([
			{
				date: mockDate,
				columnName: 'Completado',
			},
		])
	})

	test('Los nuevos cambios registrados siempre deben ir al final del historial existente.', () => {
		const mockDate1 = new Date('2024-01-15T10:00:00.000Z')
		const mockDate2 = new Date('2024-01-15T11:00:00.000Z')

		const task: taskModel = {
			timelineHistory: [
				{
					date: mockDate1,
					columnName: 'Por Hacer',
				},
			],
		} as taskModel

		vi.spyOn(global, 'Date').mockImplementation(() => mockDate2 as Date)

		const result = addChangeToTaskTimelineHistory({
			task,
			columnName: 'En Progreso',
		})

		expect(result).toHaveLength(2)
		expect(result[0]).toEqual({
			date: mockDate1,
			columnName: 'Por Hacer',
		})
		expect(result[1]).toEqual({
			date: mockDate2,
			columnName: 'En Progreso',
		})
	})

	test('No se debe agregar un nuevo registro al historial si el columnName es identico al columnName del ultimo registro existente.', () => {
		const mockDate1 = new Date('2024-01-15T10:00:00.000Z')
		const mockDate2 = new Date('2024-01-15T11:00:00.000Z')

		const task: taskModel = {
			timelineHistory: [
				{
					date: mockDate1,
					columnName: 'En Progreso',
				},
			],
		} as taskModel

		vi.spyOn(global, 'Date').mockImplementation(() => mockDate2 as Date)

		const result = addChangeToTaskTimelineHistory({
			task,
			columnName: 'En Progreso',
		})

		expect(result).toHaveLength(1)
		expect(result[0]).toEqual({
			date: mockDate1,
			columnName: 'En Progreso',
		})
	})

	test('No debe mutar el historial original de la tarea.', () => {
		const mockDate1 = new Date('2024-01-15T10:00:00.000Z')
		const mockDate2 = new Date('2024-01-15T11:00:00.000Z')

		const originalHistory = [
			{
				date: mockDate1,
				columnName: 'Por Hacer',
			},
		]
		const task: taskModel = {
			timelineHistory: originalHistory,
		} as taskModel

		vi.spyOn(global, 'Date').mockImplementation(() => mockDate2 as Date)

		const result = addChangeToTaskTimelineHistory({
			task,
			columnName: 'Completado',
		})

		expect(originalHistory).toHaveLength(1)
		expect(result).toHaveLength(2)
		expect(result).not.toBe(originalHistory)
	})

	test('No puede haber un registro de cambio con un columnName vacío.', () => {
		const task: taskModel = {
			...emptyTaskForTest,
		}

		expect(() => {
			addChangeToTaskTimelineHistory({
				task,
				columnName: '',
			})
		}).toThrow()
	})
})
