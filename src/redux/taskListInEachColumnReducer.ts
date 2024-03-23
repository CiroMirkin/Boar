import { taskList, taskModel } from "@/models/task";
import { addTaskInFirstColumn } from "@/useCase/task/addTask";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: taskList[] = [[], [], []]

export const taskListInEachColumnSlice = createSlice({
    name: 'taskListInEachColumn',
    initialState,
    reducers: {
        addTaskAtFirstColumn: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state = addTaskInFirstColumn({ taskListInEachColumn: state, task })
        }
    }
})

export const { addTaskAtFirstColumn } = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer