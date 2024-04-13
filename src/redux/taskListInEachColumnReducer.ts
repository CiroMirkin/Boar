import { columnModel, getIndexOfColumnInColumnList } from "@/models/column";
import { taskModel } from "@/models/task";
import { TaskListInEachColumn } from "@/models/taskListInEachColumn";
import { TaskListInEachColumnRepository } from "@/models/taskListRepository";
import LocalStorageTaskListInEachColumnRepository from "@/repositories/localStorageTaskLists";
import { addTaskInFirstColumn } from "@/useCases/task/addTask";
import { deleteThisTask } from "@/useCases/task/deleteTask";
import { deleteLastTaskList, deleteTheTaskListInThisIndex } from "@/useCases/task/deleteTaskList";
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from "@/useCases/task/moveTask";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    list: TaskListInEachColumn
}

const taskListInEachColumnRepository: TaskListInEachColumnRepository = new LocalStorageTaskListInEachColumnRepository()

const initialState: InitialState = {
    list: taskListInEachColumnRepository.getAll()
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
        },
        addEmptyTaskListAtTheEnd: (state) => {
            state.list.push([])
        },
        deleteTheTaskListOfThisColumn: (state, action: PayloadAction<columnModel>) => {
            const column = action.payload
            const taskListIndex = getIndexOfColumnInColumnList(column.position)
            state.list = deleteTheTaskListInThisIndex({ index: taskListIndex, taskListInEachColumn: state.list })
        }
    }
})

export const { addTaskAtFirstColumn, deleteTask, moveTaskToNextColumn, moveTaskToPrevColumn, deleteLastTheTaskList, addEmptyTaskListAtTheEnd, deleteTheTaskListOfThisColumn } = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer