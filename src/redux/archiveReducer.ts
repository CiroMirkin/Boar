import { Archive } from "@/models/archive";
import { ArchiveRepository } from "@/models/archiveRepository";
import { TaskListInEachColumn } from "@/models/taskListInEachColumn";
import LocalStorageArchiveRepository from "@/repositories/localStorageArchive";
import { archiveTaskListInTheLastColumn } from "@/useCases/archive/archiveTaskList";
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
            state.list = archiveTaskListInTheLastColumn({ taskListInEachColumn: taskList, columnPosition: "3" , archive: state.list })
        },
    }
})

export const { archiveTaskListAtLastColumn } = archiveSlice.actions
export default archiveSlice.reducer