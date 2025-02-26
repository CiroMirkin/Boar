import BusinessError from '@/sharedByModules/errors/businessError'
import { Column } from './column'

/**
 * Lista ordenada con todas las columnas que contiene un tablero.
 *
 * Cada columna en esta lista tiene su correspondiente lista de tareas en el arreglo TaskListInEachColumn. Estos dos arreglos deben mantener una consistencia, si hay mas o menos elementos en alguno de los dos arreglos habrá errores.
 */
export type ColumnList = Column[]

export const defaultColumnList: Column[] = [
	{
		id: 'c1',
		name: 'Pendientes',
		position: '1',
	},
	{
		id: 'c2',
		name: 'Procesando',
		position: '2',
	},
	{
		id: 'c3',
		name: 'Terminado',
		position: '3',
	},
]

const limitOfColumns = 6

export const isItWithinTheLimitOfColumns = (columnList: ColumnList): true | BusinessError => {
	if (columnList.length > limitOfColumns)
		throw new BusinessError('Alcanzaste el limite de columnas.')
	return true
}
