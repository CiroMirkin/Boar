import BusinessError from "@/errors/businessError";
import { TaskList } from "./taskListInEachColumn";

export interface taskListArchived {
    date: string,
    tasklist: TaskList
}

export type Archive = taskListArchived[]

const archiveLimit = 60
const dailyArchiveLimit = 30

export const getDateOfTheFirstTaskListArchived = (archive: Archive): string | null => {
    const lastTaskListArchived = archive[0];
    if (lastTaskListArchived) {
        return lastTaskListArchived.date;
    }
    return null;
};

export const isItWithinTheArchiveLimit = (archive: Archive): true | BusinessError => {
    if(archive.length >= archiveLimit) throw new BusinessError('El archivo esta lleno :(')
    return true
}

export const isItWithinTheDailyArchiveLimit = (taskListArchived: TaskList): true | BusinessError => {
    if(taskListArchived.length > dailyArchiveLimit) throw new BusinessError('El archivo diario esta lleno :(')
    return true
}
