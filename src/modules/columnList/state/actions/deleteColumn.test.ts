import { Column } from '../../models/column.ts'
import { deleteThisColumn } from './deleteColumn.ts'
import { expect } from 'vitest'

describe('Eliminar columna.', () => {
	test('Se debería eliminar la columna indicada.', () => {
		const column: Column = {
			id: 'c2',
			name: '',
			position: '2',
		}
		const columnList: Column[] = [
			{
				id: '',
				name: 'pipi',
				position: '1',
			},
			{ ...column },
			{
				id: '',
				name: 'pupu',
				position: '3',
			},
		]

		expect(deleteThisColumn({ columnList, column })).toStrictEqual([
			{
				id: '',
				name: 'pipi',
				position: '1',
			},
			{
				id: '',
				name: 'pupu',
				position: '2',
			},
		])
	})

	test('Debería poderse eliminar una columna solo cuando hay mas de dos.', () => {
		const columnList: Column[] = [
			{
				id: '',
				name: '',
				position: '1',
			},
			{
				id: 'c2',
				name: '',
				position: '2',
			},
		]
		const column: Column = {
			id: 'c2',
			name: '',
			position: '2',
		}
		expect(() => {
			return deleteThisColumn({ columnList, column })
		}).toThrow('No puedes tener menos de dos columnas.')
	})
})
