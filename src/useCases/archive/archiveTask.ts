import { Archive } from "@/models/archive";
import { taskModel } from "@/models/task";
import { getDateOfTheFirstTaskListArchived } from "@/models/archive";
import BusinessError from "@/errors/businessError";
import { getFullDate } from "@/utils/getTime";

export const archiveThisTask = ({ task, archive }: { task: taskModel, archive: Archive }): Archive => {
    const date = getFullDate()

    if(getDateOfTheFirstTaskListArchived(archive) === date) {
        const indexOfTheLastTaskListArchived = archive.length - 1
        const indexOfTheTaskInTheTaskListArchived = 0
        const itemsToBeRemovedOrReplaced = 0;
        archive[indexOfTheLastTaskListArchived].tasklist.splice(
            indexOfTheTaskInTheTaskListArchived,
            itemsToBeRemovedOrReplaced,
            task
        )

        if(archive[indexOfTheLastTaskListArchived].tasklist.length > 30) throw new BusinessError('El archivo diario esta lleno :(')
        return archive
    }

    archive.push({
        date,
        tasklist: [task]
    })
    return archive
}