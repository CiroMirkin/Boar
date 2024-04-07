import { taskList } from "../../models/task";
import { getFullDate } from "../../utils/getTime";
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
    if(archive.length >= 60) throw new Error('El archivo esta lleno :(')
    if(taskListToArchive.length > 30) throw new Error('El archivo diario esta lleno :(')

    

    if(getDataOfTheLastTaskListArchived(archive) === date) {
        const toArchive = [...taskListToArchive, ...archive[archive.length - 1].tasklist]
        archive[archive.length - 1].tasklist = toArchive
        if(toArchive.length > 30) throw new Error('El archivo diario esta lleno :(')
        return archive
    }

    archive.push({
        date,
        tasklist: taskListToArchive
    })
    return archive
}

const AreThereTasksToBeArchive = (taskList: taskList): boolean => !taskList.length

const getDataOfTheLastTaskListArchived = (archive: Archive): string | null => {
    const lastTaskListArchived = archive[archive.length -1]
    if(lastTaskListArchived) {
        return lastTaskListArchived.date
    }
    return null
}