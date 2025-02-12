import { Archive } from '@/archive/models/archive'
import { ArchiveRepository } from '@/archive/models/archiveRepository'
import { taskModel } from '@/columnList/taskList/models/task' 
import { TaskListInEachColumn } from '@/columnList/taskList/models/taskList'
import LocalStorageArchiveRepository from '@/archive/state/localStorageArchive'
import { archiveThisTask } from '@/archive/state/actions/archiveTask'
import { archiveTaskListInTheLastColumn } from '@/archive/state/actions/archiveTaskList'
import { cleanTheWholeArchive } from '@/archive/state/actions/cleanArchive'
import { deleteThisArchivedTask } from '@/archive/state/actions/deleteArchivedTask'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	list: Archive
}

const archiveRepository: ArchiveRepository = new LocalStorageArchiveRepository()

const initialState: InitialState = {
	list: archiveRepository.getAll(),
}

export const archiveSlice = createSlice({
	name: 'archive',
	initialState,
	reducers: {
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

export const { archiveTaskListAtLastColumn, archiveTask, deleteArchivedTask, cleanArchive } =
	archiveSlice.actions
export default archiveSlice.reducer
