import { Archive } from '@/models/archive'
import { ArchiveRepository } from '@/models/archiveRepository'
import { taskModel } from '@/board/taskList/models/task'
import { TaskListInEachColumn } from '@/board/taskList/models/taskList'
import LocalStorageArchiveRepository from '@/repositories/localStorageArchive'
import { archiveThisTask } from '@/redux/archive/archiveTask'
import { archiveTaskListInTheLastColumn } from '@/redux/archive/archiveTaskList'
import { cleanTheWholeArchive } from '@/redux/archive/cleanArchive'
import { deleteThisArchivedTask } from '@/redux/archive/deleteArchivedTask'
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
