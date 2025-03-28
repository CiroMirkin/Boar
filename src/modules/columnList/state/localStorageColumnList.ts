import { defaultColumnList } from '../models/columnList'
import { ColumnList } from '../models/columnList'
import { ColumnListRepository } from './columnListRepository'

export default class LocalStorageColumnListRepository implements ColumnListRepository {
	key
	constructor() {
		this.key = 'columnList'
	}
	save(columnList: ColumnList): void {
		localStorage.setItem(this.key, JSON.stringify(columnList))
	}
	getAll(): ColumnList {
		return localStorage.getItem(this.key)
			? JSON.parse(localStorage.getItem(this.key) as string)
			: defaultColumnList
	}
}
