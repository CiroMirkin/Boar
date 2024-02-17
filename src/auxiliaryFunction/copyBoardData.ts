import { boardModel } from "../models/board"

export const getCopyOfTheBoardData = (allBoardData: boardModel): boardModel => {
    const { boardData, columnList, tasksInColumns } = allBoardData
    return {
        boardData: {...boardData},
        columnList: [...columnList],
        tasksInColumns: [...tasksInColumns]
    }
}