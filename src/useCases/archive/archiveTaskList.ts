import BusinessError from "@/errors/businessError";
import { taskList } from "../../models/task";
import { getFullDate } from "../../utils/getTime";
import { Archive } from "@/models/archive";
import { getDateOfTheLastTaskListArchived } from "@/models/archive";

interface archiveTaskListParams {
    taskListInEachColumn: taskList[],
    columnPosition: string,
    archive: Archive
}
export function archiveTaskListInTheLastColumn({ taskListInEachColumn, archive }: archiveTaskListParams): Archive { 
    const date = getFullDate()
    const taskListToArchive: taskList = taskListInEachColumn[taskListInEachColumn.length - 1]
    
    if(AreThereTasksToBeArchive(taskListToArchive)) throw new BusinessError('No hay tareas que archivar.')
    if(archive.length >= 60) throw new BusinessError('El archivo esta lleno :(')
    if(taskListToArchive.length > 30) throw new BusinessError('El archivo diario esta lleno :(')

    

    if(getDateOfTheLastTaskListArchived(archive) === date) {
        const toArchive = [...taskListToArchive, ...archive[archive.length - 1].tasklist]
        archive[archive.length - 1].tasklist = toArchive
        if(toArchive.length > 30) throw new BusinessError('El archivo diario esta lleno :(')
        return archive
    }

    archive.push({
        date,
        tasklist: taskListToArchive
    })
    return archive
}

const AreThereTasksToBeArchive = (taskList: taskList): boolean => !taskList.length
