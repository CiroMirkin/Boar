import { Archive } from '../models/archive'
import { deleteThisArchivedTask } from './deleteArchivedTask'
import { getFullDate } from '@/shared/lib/getTime'
import { emptyTask } from '@/modules/TaskBoard/model/task'
import { expect } from 'vitest'

describe('Eliminar una tarea del archivo.', () => {
	test('Se debería eliminar la tarea indicada del archivo.', () => {
		const task = { ...emptyTask }
		const archive: Archive = [
			{
				date: getFullDate(),
				tasklist: [{ ...task }],
			},
		]
		expect(deleteThisArchivedTask({ archive, task })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [],
			},
		])
	})
})
