import { SessionType } from "@/SessionProvider"
import { emptyTaskListInEachColumn, TaskListInEachColumn } from "../models/taskList"
import LocalStorageTaskListInEachColumnRepository from "./localStorageTaskLists"
import { sendForSaveTaskListInEachColumn } from "./sendForSaveTaskListInEachColumn"

interface useSaveTaskListOfColumnsParams {
    data: TaskListInEachColumn
    session: SessionType
    emptyData?: boolean
}

/** Guarda la entidad TaskListInEachColumn */
export const useSaveTaskListOfColumns = ({ data, session, emptyData = false }: useSaveTaskListOfColumnsParams) => {
    const localStorage = new LocalStorageTaskListInEachColumnRepository()
    const localTaskListOfColumns = localStorage.getAll()

    if( JSON.stringify(data) !== JSON.stringify(emptyTaskListInEachColumn) || emptyData) {
        const isNotTheLocalTaskListOfColumns = JSON.stringify(data) !== JSON.stringify(localTaskListOfColumns)
        if(!!session && isNotTheLocalTaskListOfColumns) {
            sendForSaveTaskListInEachColumn(data)
        }
        else {
            localStorage.save(data)
        } 
    }
}