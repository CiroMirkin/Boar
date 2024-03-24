import { taskList, taskModel } from "@/models/task";
import { addTaskInFirstColumn } from "@/useCase/task/addTask";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    list: taskList[]
}

const initialState: InitialState = {
    list: [[], [], []]
}

export const taskListInEachColumnSlice = createSlice({
    name: 'taskListInEachColumn',
    initialState,
    reducers: {
        addTaskAtFirstColumn: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = addTaskInFirstColumn({ taskListInEachColumn: state.list, task })
        }
    }
})

export const { addTaskAtFirstColumn } = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer