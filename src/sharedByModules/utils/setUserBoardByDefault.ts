import { Dispatch } from '@reduxjs/toolkit'
import { changeActualTagGroup } from '@/modules/taskList/Tags/state/tagsReducer'
import { eisenhowerTagGroup } from '@/modules/taskList/Tags/model/defaultTags'

export const setBoardByDefault = (dispatch: Dispatch): void => {
	dispatch(changeActualTagGroup(eisenhowerTagGroup))
}
