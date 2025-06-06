import { SessionType } from "@/SessionProvider"
import { emptyTaskListInEachColumn, TaskListInEachColumn } from "../models/taskList"
import LocalStorageTaskListInEachColumnRepository from "./localStorageTaskLists"
import { sendForSaveTaskListInEachColumn } from "./sendForSaveTaskListInEachColumn"

interface useSaveTaskListOfColumnsParams {
    data: TaskListInEachColumn
    session: SessionType
}

/** Guarda la entidad TaskListInEachColumn */
export const useSaveTaskListOfColumns = ({ data, session }: useSaveTaskListOfColumnsParams) => {
    const localStorage = new LocalStorageTaskListInEachColumnRepository()
    const localTaskListOfColumns = localStorage.getAll()

    if( JSON.stringify(data) !== JSON.stringify(emptyTaskListInEachColumn)) {
        const isNotTheLocalTaskListOfColumns = JSON.stringify(data) !== JSON.stringify(localTaskListOfColumns)
        if(!!session && isNotTheLocalTaskListOfColumns) {
            sendForSaveTaskListInEachColumn(data)
        }
        else {
            localStorage.save(data)
        } 
    }
}