import { boardModel } from "../models/board";
import { boardUseCaseParams } from "./useCase";
import { taskList } from "../models/task";
import { getFullDate } from "../utility/getTime";
import { archive } from "@/models/archive";
import { getIndexOfColumnInColumnList } from "@/utility/indexOfColumn";

export function archiveTaskListInTheLastColumn({ board }: boardUseCaseParams): boardModel {
    const columnIndex = Number(board.columnList.length) - 1
    return archiveTaskListInColumn({ board, columnIndex })
}

interface archiveTaskListParams {
    taskListInEachColumn: taskList[],
    columnPosition: string,
    archive: archive
}
export function archiveTaskListInColumn({ taskListInEachColumn, columnPosition, archive }: archiveTaskListParams): archive {
    const date = getFullDate()
    const taskListToArchive: taskList = structuredClone(taskListInEachColumn[getIndexOfColumnInColumnList(columnPosition)])
    archive.push({
        date,
        tasklist: taskListToArchive
    })
    return archive
}