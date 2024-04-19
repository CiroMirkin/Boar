import { columnList } from "./columnList";

export interface ColumnListRepository {
    save(columnList: columnList): void;
    getAll(): columnList;
}