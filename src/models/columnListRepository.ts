import { columnList } from "./column";

export interface ColumnListRepository {
    save(columnList: columnList): void;
    getAll(): columnList;
}