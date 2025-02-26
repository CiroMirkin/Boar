import { Archive } from '@/modules/taskList/archive/models/archive'
import { deleteThisArchivedTask } from './deleteArchivedTask'
import { getFullDate } from '@/sharedByModules/utils/getTime'
import { emptyTask } from '@/modules/taskList/models/task'

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
