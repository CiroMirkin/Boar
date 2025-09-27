import { ColumnList } from '@/modules/columnList/models/columnList'
import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'

export interface UserBoardOnSupabase {
	user_id: string | undefined
	name: string
	column_list: ColumnList
	task_list_in_each_column: TaskListInEachColumn
}
