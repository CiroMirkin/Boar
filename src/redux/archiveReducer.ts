import { Archive } from "@/models/archive";
import { ArchiveRepository } from "@/models/archiveRepository";
import { taskModel } from "@/models/task";
import { TaskListInEachColumn } from "@/models/taskListInEachColumn";
import LocalStorageArchiveRepository from "@/repositories/localStorageArchive";
import { archiveThisTask } from "@/useCases/archive/archiveTask";
import { archiveTaskListInTheLastColumn } from "@/useCases/archive/archiveTaskList";
import { cleanTheWholeArchive } from "@/useCases/archive/cleanArchive";
import { deleteThisArchivedTask } from "@/useCases/archive/deleteArchivedTask";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    list: Archive
}

const archiveRepository: ArchiveRepository = new LocalStorageArchiveRepository()

const initialState: InitialState = {
    list: archiveRepository.getAll()
}

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        archiveTaskListAtLastColumn: (state, action: PayloadAction<TaskListInEachColumn>) => {
            const taskList = action.payload
            state.list = archiveTaskListInTheLastColumn({ taskListInEachColumn: taskList, archive: state.list })
        },
        archiveTask: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = archiveThisTask({ archive: state.list, task })
        },
        deleteArchivedTask: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = deleteThisArchivedTask({ archive: state.list, task })
        },
        cleanArchive: (state) => {
            state.list = cleanTheWholeArchive()
        }
    }
})

export const { archiveTaskListAtLastColumn, archiveTask, deleteArchivedTask, cleanArchive } = archiveSlice.actions
export default archiveSlice.reducer