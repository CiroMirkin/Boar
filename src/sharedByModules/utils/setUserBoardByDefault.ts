import { setTaskListInEachColumn } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { emptyTaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { setColumnList } from '@/modules/columnList/state/columnListReducer'
import { defaultColumnList } from '@/modules/columnList/models/columnList'
import { Dispatch } from '@reduxjs/toolkit'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { eisenhowerTagGroup } from '@/modules/taskList/Tags/model/defaultTags'

export const setBoardByDefault = (dispatch: Dispatch): void => {
	dispatch(setTaskListInEachColumn(emptyTaskListInEachColumn))
	dispatch(setColumnList(defaultColumnList))
	// Board is now handled by React Query, no need to set in Redux
	dispatch(changeActualTagGroup(eisenhowerTagGroup))
}
