import BusinessError from "@/errors/businessError";
import { TaskList } from "./taskListInEachColumn";

export interface taskListArchived {
    date: string,
    tasklist: TaskList
}

export type Archive = taskListArchived[]

export const getDateOfTheLastTaskListArchived = (archive: Archive): string | null => {
    const lastTaskListArchived = archive[archive.length - 1];
    if (lastTaskListArchived) {
        return lastTaskListArchived.date;
    }
    return null;
};

export const isItWithinTheArchiveLimit = (archive: Archive): true | BusinessError => {
    if(archive.length >= 60) throw new BusinessError('El archivo esta lleno :(')
    return true
}

export const isItWithinTheDailyArchiveLimit = (taskListArchived: TaskList): true | BusinessError => {
    if(taskListArchived.length > 30) throw new BusinessError('El archivo diario esta lleno :(')
    return true
}
