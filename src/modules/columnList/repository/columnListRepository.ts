import { ColumnList } from '../models/columnList'

export interface ColumnListRepository {
	save(columnList: ColumnList): void | Promise<void>
	getAll(): Promise<ColumnList>
}
