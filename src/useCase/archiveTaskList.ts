import { boardModel } from "../models/board";

interface archiveTaskListParams {
    board: boardModel,
    columnIndex: number
}
export function archiveTaskListInColumn({ board, columnIndex }: archiveTaskListParams): boardModel {

    return board
}