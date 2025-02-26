import { emptyTask } from '@/modules/taskList/models/task'
import { TaskList } from '@/modules/taskList/models/taskList'
import { archiveTaskListInTheLastColumn } from './archiveTaskList'
import { getFullDate } from '../../../../../shared/utils/getTime'

describe('Archivar lista de tareas.', () => {
	test('Se deberían archivar todas las tareas de la columna indicada.', () => {
		const task = { ...emptyTask }
		const taskListInEachColumn: TaskList[] = [[{ ...task }]]
		expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, archive: [] })).toStrictEqual(
			[
				{
					date: getFullDate(),
					tasklist: [{ ...task }],
				},
			]
		)
	})

	test('No se debería poder archivar una lista de tareas vacía.', () => {
		expect(() => {
			return archiveTaskListInTheLastColumn({ taskListInEachColumn: [[]], archive: [] })
		}).toThrow('No hay tareas que archivar.')
	})

	test('No debería haber mas de 30 tareas diarias archivadas.', () => {
		const task = {
			id: '',
			descriptionText: '',
			columnPosition: '1',
		}
		const taskListInEachColumn: TaskList[] = [[], [], []]
		const firstColumnContent = new Array(31).fill(task)
		taskListInEachColumn[2] = firstColumnContent
		expect(() => {
			return archiveTaskListInTheLastColumn({ taskListInEachColumn, archive: [] })
		}).toThrow('El archivo diario esta lleno :(')
	})

	test('No debería haber mas de 60 días archivados.', () => {
		const task = {
			id: '',
			descriptionText: '',
			columnPosition: '1',
		}
		const taskListInEachColumn: TaskList[] = [[], [], [{ ...task }]]
		const archive = new Array(60).fill({
			date: '',
			tasklist: [[]],
		})

		expect(() => {
			return archiveTaskListInTheLastColumn({ taskListInEachColumn, archive })
		}).toThrow('El archivo esta lleno :(')
	})
})

describe('Si se archivan varias tareas el mismo dia, estas deberían archivarse juntas.', () => {
	test('Hay tareas archivadas y se archivan mas. Todo en el mismo dia.', () => {
		const task = {
			id: '',
			descriptionText: 'Nueva tarea para archivar',
			columnPosition: '',
		}
		const taskListInEachColumn: TaskList[] = [[{ ...task }]]
		const archive = [
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'Tarea que ya estaba archivada',
						columnPosition: '',
					},
				],
			},
		]
		expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'Nueva tarea para archivar',
						columnPosition: '',
					},
					{
						id: '',
						descriptionText: 'Tarea que ya estaba archivada',
						columnPosition: '',
					},
				],
			},
		])
	})

	test('Hay tareas archivadas de otro dia. Hoy se archivan mas.', () => {
		const taskListInEachColumn: TaskList[] = [
			[],
			[
				{
					id: '',
					descriptionText: 'tarea1',
					columnPosition: '',
				},
				{
					id: '',
					descriptionText: 'Tarea2',
					columnPosition: '',
				},
			],
		]
		const archive = [
			{
				date: 'sábado, 20 de abril de 2024',
				tasklist: [
					{
						id: 'f2c65892-00d3-40b9-adc7-d00da0d16bd6',
						descriptionText: 'cafe https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
					{
						id: '7054954d-2d6a-44db-9e84-f6e0b7d82876',
						descriptionText: 'taskDescriptionWithURL',
						columnPosition: '2',
					},
					{
						id: '12ca76a7-2f02-4c14-8860-f3c6614b3ccf',
						descriptionText: 'https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
				],
			},
			{
				date: 'domingo, 14 de abril de 2024',
				tasklist: [
					{
						id: '7f1a444c-2f48-41fe-97cf-9ca6d56db9e7',
						descriptionText: 'cafe4',
						columnPosition: '2',
					},
					{
						id: '36dfee79-0a8e-4b2f-b38b-3b75565192c2',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '093686ec-3085-42bd-bc12-874f10246406',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '2c73dfc6-f325-4e06-8a22-12946a2d8f44',
						descriptionText: 'cafe2',
						columnPosition: '2',
					},
				],
			},
		]
		expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'tarea1',
						columnPosition: '',
					},
					{
						id: '',
						descriptionText: 'Tarea2',
						columnPosition: '',
					},
				],
			},
			{
				date: 'sábado, 20 de abril de 2024',
				tasklist: [
					{
						id: 'f2c65892-00d3-40b9-adc7-d00da0d16bd6',
						descriptionText: 'cafe https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
					{
						id: '7054954d-2d6a-44db-9e84-f6e0b7d82876',
						descriptionText: 'taskDescriptionWithURL',
						columnPosition: '2',
					},
					{
						id: '12ca76a7-2f02-4c14-8860-f3c6614b3ccf',
						descriptionText: 'https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
				],
			},
			{
				date: 'domingo, 14 de abril de 2024',
				tasklist: [
					{
						id: '7f1a444c-2f48-41fe-97cf-9ca6d56db9e7',
						descriptionText: 'cafe4',
						columnPosition: '2',
					},
					{
						id: '36dfee79-0a8e-4b2f-b38b-3b75565192c2',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '093686ec-3085-42bd-bc12-874f10246406',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '2c73dfc6-f325-4e06-8a22-12946a2d8f44',
						descriptionText: 'cafe2',
						columnPosition: '2',
					},
				],
			},
		])
	})

	test('Hay tareas archivadas de otro dia. Hoy ya hay tareas archivadas y se archivan mas.', () => {
		const task = {
			id: '',
			descriptionText: 'tarea1',
			columnPosition: '',
		}
		const taskListInEachColumn: TaskList[] = [[], [{ ...task }]]
		const archive = [
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'Tarea que ya estaba archivada',
						columnPosition: '',
					},
				],
			},
			{
				date: 'sábado, 20 de abril de 2024',
				tasklist: [
					{
						id: 'f2c65892-00d3-40b9-adc7-d00da0d16bd6',
						descriptionText: 'cafe https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
					{
						id: '7054954d-2d6a-44db-9e84-f6e0b7d82876',
						descriptionText: 'taskDescriptionWithURL',
						columnPosition: '2',
					},
					{
						id: '12ca76a7-2f02-4c14-8860-f3c6614b3ccf',
						descriptionText: 'https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
				],
			},
			{
				date: 'domingo, 14 de abril de 2024',
				tasklist: [
					{
						id: '7f1a444c-2f48-41fe-97cf-9ca6d56db9e7',
						descriptionText: 'cafe4',
						columnPosition: '2',
					},
					{
						id: '36dfee79-0a8e-4b2f-b38b-3b75565192c2',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '093686ec-3085-42bd-bc12-874f10246406',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '2c73dfc6-f325-4e06-8a22-12946a2d8f44',
						descriptionText: 'cafe2',
						columnPosition: '2',
					},
				],
			},
		]
		expect(archiveTaskListInTheLastColumn({ taskListInEachColumn, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'tarea1',
						columnPosition: '',
					},
					{
						id: '',
						descriptionText: 'Tarea que ya estaba archivada',
						columnPosition: '',
					},
				],
			},
			{
				date: 'sábado, 20 de abril de 2024',
				tasklist: [
					{
						id: 'f2c65892-00d3-40b9-adc7-d00da0d16bd6',
						descriptionText: 'cafe https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
					{
						id: '7054954d-2d6a-44db-9e84-f6e0b7d82876',
						descriptionText: 'taskDescriptionWithURL',
						columnPosition: '2',
					},
					{
						id: '12ca76a7-2f02-4c14-8860-f3c6614b3ccf',
						descriptionText: 'https://lucide.dev/icons/circle-help',
						columnPosition: '2',
					},
				],
			},
			{
				date: 'domingo, 14 de abril de 2024',
				tasklist: [
					{
						id: '7f1a444c-2f48-41fe-97cf-9ca6d56db9e7',
						descriptionText: 'cafe4',
						columnPosition: '2',
					},
					{
						id: '36dfee79-0a8e-4b2f-b38b-3b75565192c2',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '093686ec-3085-42bd-bc12-874f10246406',
						descriptionText: 'cafe3',
						columnPosition: '2',
					},
					{
						id: '2c73dfc6-f325-4e06-8a22-12946a2d8f44',
						descriptionText: 'cafe2',
						columnPosition: '2',
					},
				],
			},
		])
	})
})
