import { emptyTask } from '@/modules/taskList/models/task'
import { archiveThisTask } from './archiveTask'
import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'
import { getFullDate } from '@/sharedByModules/utils/getTime'
import { expect } from 'vitest';

describe('Archivar una tarea.', () => {
	test('Se debería archivar la tarea indicada.', () => {
		const task = { ...emptyTask }
		const archive: Archive = []
		expect(archiveThisTask({ task, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						...task,
					},
				],
			},
		])
	})

	test('La tarea archivada debería estar al inicio de la lista de tareas archivadas.', () => {
		const task = {
			id: '',
			descriptionText: 'pipi',
			columnPosition: '2',
		}
		const archive: Archive = [
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'pupu',
						columnPosition: '2',
					},
				],
			},
		]
		expect(archiveThisTask({ task, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'pipi',
						columnPosition: '2',
					},
					{
						id: '',
						descriptionText: 'pupu',
						columnPosition: '2',
					},
				],
			},
		])
	})

	test('Se archiva la tarea y ya hay tareas archivadas ese mismo dia y otros.', () => {
		const task = {
			id: '',
			descriptionText: 'tarea',
			columnPosition: '',
		}
		const archive: Archive = [
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'tarea que ya estaba archivada',
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

		expect(archiveThisTask({ task, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'tarea',
						columnPosition: '',
					},
					{
						id: '',
						descriptionText: 'tarea que ya estaba archivada',
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

	test('Se archiva la primer tarea del dia y hay tareas archivadas de otros días.', () => {
		const task = {
			id: '',
			descriptionText: 'Primer tarea del dia',
			columnPosition: '',
		}
		const archive: Archive = [
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

		expect(archiveThisTask({ task, archive })).toStrictEqual([
			{
				date: getFullDate(),
				tasklist: [
					{
						id: '',
						descriptionText: 'Primer tarea del dia',
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

	test('No se debería poder archivar la tarea si ya hay 30 tareas archivadas.', () => {
		const task = {
			id: '',
			descriptionText: '',
			columnPosition: '1',
		}
		const archive: Archive = [
			{
				date: getFullDate(),
				tasklist: new Array(30).fill({ ...emptyTask }),
			},
		]

		expect(() => {
			return archiveThisTask({ task, archive })
		}).toThrow('El archivo diario esta lleno :(')
	})
})
