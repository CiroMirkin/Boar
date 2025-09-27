import { ColumnList } from '@/modules/columnList/models/columnList'
import { Notes } from '@/modules/notes/model/notes'
import { TaskListInEachColumn } from '@/modules/taskList/models/taskList'
import { Reminder } from '@/modules/taskList/Reminder/reminder'
import { TagGroup } from '@/modules/taskList/Tags/model/tags'

export interface UserBoardOnSupabase {
	user_id: string | undefined
	name: string
	column_list: ColumnList
	task_list_in_each_column: TaskListInEachColumn
	notes: Notes
	actual_tag_group: TagGroup
	reminders: Reminder
}
