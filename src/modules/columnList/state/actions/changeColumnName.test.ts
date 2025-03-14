import { Column } from '../../models/column'
import { changeNameOfColumn } from './changeColumnName'
import { expect } from 'vitest';

describe('Cambiar el nombre de una columna.', () => {
	test('Se debería cambiar el nombre de la columna indicada.', () => {
		const column: Column = {
			id: 'c1',
			name: '',
			position: '1',
		}
		const columnList: Column[] = [{ ...column }]
		expect(changeNameOfColumn({ columnList, column, newName: 'pipi' })).toStrictEqual([
			{
				id: 'c1',
				position: '1',
				name: 'pipi',
			},
		])
	})

	test('No se debería poder cambiar el nombre de una columna por un string vacio.', () => {
		const column: Column = {
			id: 'c1',
			name: '',
			position: '1',
		}
		const columnList: Column[] = [{ ...column }]
		expect(() => {
			return changeNameOfColumn({ columnList, column, newName: ' ' })
		}).toThrow('No se pueden crear columnas sin nombre.')
	})
})
