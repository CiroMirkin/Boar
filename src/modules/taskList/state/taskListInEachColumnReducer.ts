import { Column, getIndexOfColumnInColumnList } from '../../columnList/models/column'
import { taskModel } from '@/modules/taskList/models/task'
import { checkMaxLengthOfNotesAndComments } from '../models/NotesAndComments'
import { emptyTaskListInEachColumn, TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import {
	addTaskInFirstColumn,
	addTaskInTheLastColumn,
} from '@/modules/taskList/state/actions/addTask'
import { deleteThisTask } from '@/modules/taskList/state/actions/deleteTask'
import {
	cleanLastTaskList,
	deleteTheTaskListInThisIndex,
} from '@/modules/taskList/state/actions/deleteTaskList'
import {
	moveThisTaskToTheNextColumn,
	moveThisTaskToThePrevColumn,
} from '@/modules/taskList/state/actions/moveTask'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	DataOfTheTaskForMoveIt,
	moveThisTaskToThisColumn,
} from './actions/moveThisTaskToThisColumn'
import { Tag } from '../Tags/model/tags'
import { addTagInThisTask } from './actions/addTagInThisTask'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'

interface InitialState {
	list: TaskListInEachColumn
}
const initialState: InitialState = {
	list: emptyTaskListInEachColumn,
}

export const taskListInEachColumnSlice = createSlice({
	name: 'taskListInEachColumn',
	initialState,
	reducers: {
		setTaskListInEachColumn: (state, action: PayloadAction<TaskListInEachColumn>) => {
			state.list = action.payload
		},
		addTaskAtFirstColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			const listOfTasksInColumns = addTaskInFirstColumn({
				taskListInEachColumn: state.list,
				task,
			})
			state.list = sortListOfTasksInColumnsByPriority(listOfTasksInColumns)
		},
		addTaskAtLastColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			const listOfTasksInColumns = addTaskInTheLastColumn({
				taskListInEachColumn: state.list,
				task,
			})
			state.list = sortListOfTasksInColumnsByPriority(listOfTasksInColumns)
		},
		deleteTask: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			state.list = deleteThisTask({ taskListInEachColumn: state.list, task })
		},
		moveTaskToNextColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			const listOfTasksInColumns = moveThisTaskToTheNextColumn({
				taskListInEachColumn: state.list,
				task,
			})
			state.list = sortListOfTasksInColumnsByPriority(listOfTasksInColumns)
		},
		moveTaskToPrevColumn: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			const listOfTasksInColumns = moveThisTaskToThePrevColumn({
				taskListInEachColumn: state.list,
				task,
			})
			state.list = sortListOfTasksInColumnsByPriority(listOfTasksInColumns)
		},
		moveThisTaskToThisColumnPosition: (
			state,
			action: PayloadAction<DataOfTheTaskForMoveIt>
		) => {
			const { task, newColumnPosition } = action.payload
			const listOfTasksInColumns = moveThisTaskToThisColumn({
				taskListOfColumns: state.list,
				task,
				newColumnPosition,
			})
			state.list = sortListOfTasksInColumnsByPriority(listOfTasksInColumns)
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
		addThisTagsInThisTask: (state, action: PayloadAction<{ task: taskModel; tags: Tag[] }>) => {
			state.list = addTagInThisTask({
				taskListByColumns: state.list,
				tags: action.payload.tags,
				task: action.payload.task,
			})
		},
		updateNotesAndCommentsOfThisTask: (
			state,
			action: PayloadAction<{ task: taskModel; notes: string }>
		) => {
			const { task: taskToUpdate, notes } = action.payload
			state.list = state.list.map((taskList) => {
				return taskList.map((task) =>
					task.id === taskToUpdate.id && checkMaxLengthOfNotesAndComments(notes)
						? {
								...task,
								notesAndComments: notes,
							}
						: task
				)
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
	setTaskListInEachColumn,
	moveThisTaskToThisColumnPosition,
	addThisTagsInThisTask,
	updateNotesAndCommentsOfThisTask,
} = taskListInEachColumnSlice.actions
export default taskListInEachColumnSlice.reducer
