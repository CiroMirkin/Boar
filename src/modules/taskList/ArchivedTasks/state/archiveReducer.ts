import { Archive } from '@/modules/taskList/ArchivedTasks/models/archive'
import { taskModel } from '@/modules/taskList/models/task'
import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { archiveThisTask } from '@/modules/taskList/ArchivedTasks/state/actions/archiveTask'
import { archiveTaskListInTheLastColumn } from '@/modules/taskList/ArchivedTasks/state/actions/archiveTaskList'
import { cleanTheWholeArchive } from '@/modules/taskList/ArchivedTasks/state/actions/cleanArchive'
import { deleteThisArchivedTask } from '@/modules/taskList/ArchivedTasks/state/actions/deleteArchivedTask'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	list: Archive
}
const initialState: InitialState = {
	list: [],
}

export const archiveSlice = createSlice({
	name: 'archive',
	initialState,
	reducers: {
		setArchive: (state, action: PayloadAction<Archive>) => {
			state.list = action.payload
		},
		archiveTaskListAtLastColumn: (state, action: PayloadAction<TaskListInEachColumn>) => {
			const taskList = action.payload
			state.list = archiveTaskListInTheLastColumn({
				taskListInEachColumn: taskList,
				archive: state.list,
			})
		},
		archiveTask: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			state.list = archiveThisTask({ archive: state.list, task })
		},
		deleteArchivedTask: (state, action: PayloadAction<taskModel>) => {
			const task = action.payload
			state.list = deleteThisArchivedTask({ archive: state.list, task })
		},
		cleanArchive: (state) => {
			state.list = cleanTheWholeArchive()
		},
	},
})

export const { archiveTaskListAtLastColumn, archiveTask, deleteArchivedTask, cleanArchive, setArchive, } =
	archiveSlice.actions
export default archiveSlice.reducer
