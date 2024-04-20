import BusinessError from "@/errors/businessError";
import { TaskList } from "@/models/taskListInEachColumn";
import { getFullDate } from "../../utils/getTime";
import { Archive, isItWithinTheArchiveLimit, isItWithinTheDailyArchiveLimit } from "@/models/archive";
import { getDateOfTheLastTaskListArchived } from "@/models/archive";

interface archiveTaskListParams {
    taskListInEachColumn: TaskList[],
    columnPosition: string,
    archive: Archive
}
export function archiveTaskListInTheLastColumn({ taskListInEachColumn, archive }: archiveTaskListParams): Archive { 
    const date = getFullDate()
    const taskListToArchive: TaskList = taskListInEachColumn[taskListInEachColumn.length - 1]
    
    if(AreThereTasksToBeArchive(taskListToArchive)) throw new BusinessError('No hay tareas que archivar.')
    
    if(getDateOfTheLastTaskListArchived(archive) === date) {
        const toArchive: TaskList = [...taskListToArchive, ...archive[archive.length - 1].tasklist]
        if(isItWithinTheDailyArchiveLimit(toArchive)) {
            archive[archive.length - 1].tasklist = toArchive
            return archive
        }
    }

    if(isItWithinTheArchiveLimit(archive) && isItWithinTheDailyArchiveLimit(taskListToArchive)){
        archive.push({
            date,
            tasklist: taskListToArchive
        })
    }
    return archive
}

const AreThereTasksToBeArchive = (taskList: TaskList): boolean => !taskList.length
