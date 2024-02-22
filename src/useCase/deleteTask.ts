import { getCopyOfTheBoardData } from "../auxiliaryFunction/copyBoardData";
import { getIndexOfColumnInColumnList } from "../auxiliaryFunction/indexOfColumn";
import { boardActionParams, boardModel } from "../models/board";
import { columnModel } from "../models/column";

export function deleteThisTask({ board, task }: boardActionParams): boardModel {
    const newBoard = getCopyOfTheBoardData(board)
    const columns = newBoard.columnList
    const taskId = task.id
    const columnIndex = getIndexOfColumnInColumnList(task.columnPosition)
    
    const newColumns: columnModel[] = columns.map((column, index) => {
        if(index === columnIndex) {
            const newTaskListInColumn = column.taskList.filter(task => task.id !== taskId)
            column.taskList = newTaskListInColumn
            return column
        }
        return column
    })

    newBoard.columnList = newColumns

    return newBoard
}