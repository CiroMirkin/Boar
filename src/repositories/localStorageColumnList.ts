import { columnList, defaultColumnList } from "@/models/column";
import { ColumnListRepository } from "@/models/columnListRepository";

export default class LocalStorageTaskListInEachColumnRepository implements ColumnListRepository {
    #key;
    constructor() {
        this.#key = "columnList";
    }
    save(columnList: columnList): void {
        localStorage.setItem(this.#key, JSON.stringify(columnList))
    }
    getAll(): columnList {
        return localStorage.getItem(this.#key)
            ? JSON.parse(localStorage.getItem(this.#key) as string)
            : defaultColumnList
    }
}