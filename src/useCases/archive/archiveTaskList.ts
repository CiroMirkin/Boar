import BusinessError from "@/errors/businessError";
import { TaskList } from "@/models/taskListInEachColumn";
import { getFullDate } from "../../utils/getTime";
import { Archive, isItWithinTheArchiveLimit, isItWithinTheDailyArchiveLimit } from "@/models/archive";
import { getDateOfTheFirstTaskListArchived } from "@/models/archive";

interface archiveTaskListParams {
    taskListInEachColumn: TaskList[],
    archive: Archive
}
export function archiveTaskListInTheLastColumn({ taskListInEachColumn, archive }: archiveTaskListParams): Archive { 
    const date = getFullDate()
    const taskListToArchive: TaskList = taskListInEachColumn[taskListInEachColumn.length - 1]
    
    if(AreThereTasksToBeArchive(taskListToArchive)) throw new BusinessError('No hay tareas que archivar.')
    
    if(getDateOfTheFirstTaskListArchived(archive) === date) {
        const toArchive: TaskList = [...taskListToArchive, ...archive[0].tasklist]
        if(isItWithinTheDailyArchiveLimit(toArchive)) {
            archive = archive.map(archi => {
                if(archi.date === date) {
                    archi.tasklist = toArchive
                    return archi
                }
                return archi
            })
            return archive
        }
    }

    if(isItWithinTheArchiveLimit(archive) && isItWithinTheDailyArchiveLimit(taskListToArchive)){
        const itemsToBeRemovedOrReplaced = 0
        const indexWhereWillBe = 0
        archive.splice(
            indexWhereWillBe, 
            itemsToBeRemovedOrReplaced, 
            {
                date,
                tasklist: taskListToArchive
            }
        )
    }
    return archive
}

const AreThereTasksToBeArchive = (taskList: TaskList): boolean => !taskList.length
