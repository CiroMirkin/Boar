import { boardModel } from "./board";

export interface BoardRepository {
    save(boards: boardModel): void;
    getAll(): boardModel;
}