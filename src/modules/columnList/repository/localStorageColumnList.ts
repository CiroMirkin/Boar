import { defaultColumnList } from '../models/columnList'
import { ColumnList } from '../models/columnList'
import { ColumnListRepository } from '../repository/columnListRepository'

export default class LocalStorageColumnListRepository implements ColumnListRepository {
	key
	constructor() {
		this.key = 'columnList'
	}
	save(columnList: ColumnList): void {
		localStorage.setItem(this.key, JSON.stringify(columnList))
	}
	getAll() {
		const storedColumnList = localStorage.getItem(this.key)
		if (storedColumnList) {
			return JSON.parse(storedColumnList)
		}
		this.save(defaultColumnList)
		return defaultColumnList
	}
}
