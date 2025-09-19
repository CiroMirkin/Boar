import { configureStore } from '@reduxjs/toolkit'
import columnListReducer from './modules/columnList/state/columnListReducer'
import taskListInEachColumnReducer from './modules/taskList/state/taskListInEachColumnReducer'
import archiveReducer from './modules/taskList/ArchivedTasks/state/archiveReducer'
import boardReducer from './modules/board/state/boardReducer'
import archivedNotesReducer from './modules/notes/LibraryOfArchiveNotes/state/archivedNotesReducer'
import tagsReducer from './modules/taskList/Tags/state/tagsReducer'
import reminderReducer from './modules/taskList/Reminder/state/reminderReducer'

export const store = configureStore({
	reducer: {
		columnList: columnListReducer,
		taskListInEachColumn: taskListInEachColumnReducer,
		archive: archiveReducer,
		board: boardReducer,
		archivedNotes: archivedNotesReducer,
		tags: tagsReducer,
		reminder: reminderReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
