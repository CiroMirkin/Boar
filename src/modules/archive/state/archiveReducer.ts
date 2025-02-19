import { Archive } from '@/modules/archive/models/archive'
import { ArchiveRepository } from '@/modules/archive/models/archiveRepository'
import { taskModel } from '@/modules/columnList/taskList/models/task' 
import { TaskListInEachColumn } from '@/modules/columnList/taskList/models/taskList'
import LocalStorageArchiveRepository from '@/modules/archive/state/localStorageArchive'
import { archiveThisTask } from '@/modules/archive/state/actions/archiveTask'
import { archiveTaskListInTheLastColumn } from '@/modules/archive/state/actions/archiveTaskList'
import { cleanTheWholeArchive } from '@/modules/archive/state/actions/cleanArchive'
import { deleteThisArchivedTask } from '@/modules/archive/state/actions/deleteArchivedTask'
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
