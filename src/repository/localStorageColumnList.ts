import { columnList, defaultColumnList } from "@/model/column";
import { ColumnListRepository } from "@/model/columnListRepository";

export default class LocalStorageColumnListRepository implements ColumnListRepository {
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