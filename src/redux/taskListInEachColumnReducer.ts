import { taskList, taskModel } from "@/models/task";
import { addTaskInFirstColumn } from "@/useCase/task/addTask";
import { deleteThisTask } from "@/useCase/task/deleteTask";
import { deleteLastTaskList } from "@/useCase/task/deleteTaskList";
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from "@/useCase/task/moveTask";
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
        },
        deleteTask: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
        },
        moveTaskToNextColumn: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = moveThisTaskToTheNextColumn({ taskListInEachColumn: state.list, task })
        },
        moveTaskToPrevColumn: (state, action: PayloadAction<taskModel>) => {
            const task = action.payload
            state.list = moveThisTaskToThePrevColumn({ taskListInEachColumn: state.list, task })
        },
        deleteLastTheTaskList: (state) => {
            state.list = deleteLastTaskList({ taskListInEachColumn: state.list })
        }
    }
})

export const { addTaskAtFirstColumn, deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn, deleteLastTheTaskList } = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer