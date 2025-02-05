import { Column, getIndexOfColumnInColumnList } from '../../columnList/models/column'
import { taskModel } from '@/board/taskList/models/task'
import { TaskListInEachColumn } from '@/board/taskList/models/taskList'
import { TaskListInEachColumnRepository } from '@/board/taskList/models/taskListInEachColumnRepository'
import LocalStorageTaskListInEachColumnRepository from '@/board/taskList/state/localStorageTaskLists'
import { addTaskInFirstColumn, addTaskInTheLastColumn } from '@/board/taskList/state/actions/addTask'
import { deleteThisTask } from '@/board/taskList/state/actions/deleteTask'
import { cleanLastTaskList, deleteTheTaskListInThisIndex } from '@/board/taskList/state/actions/deleteTaskList'
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from '@/board/taskList/state/actions/moveTask'
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
