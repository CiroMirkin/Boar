import { columnModel } from "../models/column";

interface editThisTaskParams {
    taskId: string,
    newTaskText?: string,
    columns: columnModel[]
}

export const editThisTask = ({ taskId, newTaskText, columns }: editThisTaskParams): columnModel[] => {
    return columns
}