import { archive } from "@/models/archive";
import { taskList } from "@/models/task";
import { archiveTaskListInColumn } from "@/useCase/archiveTaskList";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: archive = []

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        archiveTaskListAtLastColumn: (state, action: PayloadAction<taskList[]>) => {
            const taskList = action.payload
            state = archiveTaskListInColumn({ taskListInEachColumn: taskList, columnPosition: "3" , archive: state })
        },
    }
})

export const { archiveTaskListAtLastColumn } = archiveSlice.actions
export default archiveSlice.reducer