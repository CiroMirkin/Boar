import { Column, getIndexOfColumnInColumnList } from '@/models/column'
import { taskModel } from '@/models/task'
import { TaskListInEachColumn } from '@/pages/board/models/taskList'
import { TaskListInEachColumnRepository } from '@/pages/board/models/taskListInEachColumnRepository'
import LocalStorageTaskListInEachColumnRepository from '@/repositories/localStorageTaskLists'
import { addTaskInFirstColumn, addTaskInTheLastColumn } from '@/redux/task/addTask'
import { deleteThisTask } from '@/redux/task/deleteTask'
import { cleanLastTaskList, deleteTheTaskListInThisIndex } from '@/redux/task/deleteTaskList'
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from '@/redux/task/moveTask'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	list: TaskListInEachColumn
}

const taskListInEachColumnRepository: TaskListInEachColumnRepository =
	new LocalStorageTaskListInEachColumnRepository()

const initialState: InitialState = {
	list: taskListInEachColumnRepository.getAll(),
}

export const taskListInEachColumnSlice = createSlice({
	name: 'taskListInEachColumn',
	initialState,
	reducers: {
		addTaskAtFirstColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			state.list = addTaskInFirstColumn({ taskListInEachColumn: state.list, task })
		},
		addTaskAtLastColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			state.list = addTaskInTheLastColumn({ taskListInEachColumn: state.list, task })
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
		cleanTheLastTaskList: (state) => {
			state.list = cleanLastTaskList({ taskListInEachColumn: state.list })
		},
		addEmptyTaskListAtTheEnd: (state) => {
			state.list.push([])
		},
		deleteTheTaskListOfThisColumn: (state, action: PayloadAction<Column>) => {
			const column = action.payload
			const taskListIndex = getIndexOfColumnInColumnList(column.position)
			state.list = deleteTheTaskListInThisIndex({
				index: taskListIndex,
				taskListInEachColumn: state.list,
			})
		},
	},
})

export const {
	addTaskAtFirstColumn,
	addTaskAtLastColumn,
	deleteTask,
	moveTaskToNextColumn,
	moveTaskToPrevColumn,
	cleanTheLastTaskList,
	addEmptyTaskListAtTheEnd,
	deleteTheTaskListOfThisColumn,
} = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer
