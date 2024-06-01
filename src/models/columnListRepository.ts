import { ColumnList } from './columnList'

export interface ColumnListRepository {
	save(columnList: ColumnList): void
	getAll(): ColumnList
}
