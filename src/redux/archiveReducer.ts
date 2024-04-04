import { archive } from "@/model/archive";
import { TaskListInEachColumn } from "@/model/taskListInEachColumn";
import { archiveTaskListInColumn } from "@/useCase/archiveTaskList";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    list: archive
}

const initialState: InitialState = {
    list: []
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