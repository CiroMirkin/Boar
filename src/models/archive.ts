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
