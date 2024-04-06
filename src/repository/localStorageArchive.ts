import { archive } from "@/model/archive";
import { ArchiveRepository } from "@/model/archiveRepository";

export default class LocalStorageArchiveRepository implements ArchiveRepository {
    #key;
    constructor() {
        this.#key = "tasks-archive";
    }
    save(archive: archive): void {
        localStorage.setItem(this.#key, JSON.stringify(archive))
    }
    getAll(): archive {
        return localStorage.getItem(this.#key)
            ? JSON.parse(localStorage.getItem(this.#key) as string)
            : []
    }
}