import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { Dispatch } from '@reduxjs/toolkit'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { eisenhowerTagGroup } from '@/modules/taskList/Tags/model/defaultTags'

export const setBoardByDefault = (dispatch: Dispatch): void => {
	dispatch(setTaskListInEachColumn(emptyTaskListInEachColumn))
	// Board is now handled by React Query, no need to set in Redux
	dispatch(changeActualTagGroup(eisenhowerTagGroup))
}
