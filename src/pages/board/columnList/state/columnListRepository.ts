import { ColumnList } from '../models/columnList'

export interface ColumnListRepository {
	save(columnList: ColumnList): void
	getAll(): ColumnList
}
