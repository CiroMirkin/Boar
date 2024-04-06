import { archive } from "./archive";

export interface ArchiveRepository {
    save(archive: archive): void;
    getAll(): archive;
}