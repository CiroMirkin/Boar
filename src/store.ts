import { configureStore } from '@reduxjs/toolkit'
import taskListInEachColumnReducer from './modules/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './modules/taskList/ArchivedTasks/state/archiveReducer'
import archivedNotesReducer from './modules/notes/LibraryOfArchiveNotes/state/archivedNotesReducer'
import tagsReducer from './modules/taskList/Tags/state/tagsReducer'
import reminderReducer from './modules/taskList/Reminder/state/reminderReducer'

export const store = configureStore({
	reducer: {
		taskListInEachColumn: taskListInEachColumnReducer,
		archive: archiveReducer,
		archivedNotes: archivedNotesReducer,
		tags: tagsReducer,
		reminder: reminderReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
