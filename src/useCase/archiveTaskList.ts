import { taskList } from "../models/task";
import { getFullDate } from "../utility/getTime";
import { Archive } from "@/models/archive";
import { getIndexOfColumnInColumnList } from "@/models/column";

interface archiveTaskListParams {
    taskListInEachColumn: taskList[],
    columnPosition: string,
    archive: Archive
}
export function archiveTaskListInColumn({ taskListInEachColumn, columnPosition, archive }: archiveTaskListParams): Archive {
    const date = getFullDate()
    const taskListToArchive: taskList = taskListInEachColumn[getIndexOfColumnInColumnList(columnPosition)]
    
    if(AreThereTasksToBeArchive(taskListToArchive)) throw new Error('No hay tareas que archivar.')

    archive.push({
        date,
        tasklist: taskListToArchive
    })
    return archive
}

const AreThereTasksToBeArchive = (taskList: taskList): boolean => !taskList.length