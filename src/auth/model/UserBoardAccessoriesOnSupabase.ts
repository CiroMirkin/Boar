import { Notes } from '@/modules/notes/model/notes'
import { Reminder } from '@/modules/TaskBoard/components/Reminder/model/reminder'
import { TagGroup } from '@/modules/TaskBoard/components/taskList/components/Tags/model/tags'

export interface UserBoardAccessoriesOnSupabase {
	notes: Notes
	actual_tag_group: TagGroup
	reminders: Reminder
}
