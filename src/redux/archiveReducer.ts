import { Archive } from "@/model/archive";
import { ArchiveRepository } from "@/model/archiveRepository";
import { TaskListInEachColumn } from "@/model/taskListInEachColumn";
import LocalStorageArchiveRepository from "@/repository/localStorageArchive";
import { archiveTaskListInColumn } from "@/useCase/archiveTaskList";
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
            state.list = archiveTaskListInColumn({ taskListInEachColumn: taskList, columnPosition: "3" , archive: state.list })
        },
    }
})

export const { archiveTaskListAtLastColumn } = archiveSlice.actions
export default archiveSlice.reducer