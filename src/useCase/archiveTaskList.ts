import { taskList } from "../models/task";
import { getFullDate } from "../utility/getTime";
import { archive } from "@/models/archive";
import { getIndexOfColumnInColumnList } from "@/utility/indexOfColumn";

interface archiveTaskListParams {
    taskListInEachColumn: taskList[],
    columnPosition: string,
    archive: archive
}
export function archiveTaskListInColumn({ taskListInEachColumn, columnPosition, archive }: archiveTaskListParams): archive {
    const date = getFullDate()
    const taskListToArchive: taskList = taskListInEachColumn[getIndexOfColumnInColumnList(columnPosition)]
    archive.push({
        date,
        tasklist: taskListToArchive
    })
    return archive
}