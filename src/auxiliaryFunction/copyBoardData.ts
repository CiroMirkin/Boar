import { boardModel } from "../models/board"

export const getCopyOfTheBoardData = (allBoardData: boardModel): boardModel => {
    return structuredClone(allBoardData)
}