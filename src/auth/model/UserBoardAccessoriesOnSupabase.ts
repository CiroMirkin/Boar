import { Notes } from '@/modules/notes/model/notes'
import { Reminder } from '@/modules/taskList/Reminder/reminder'
import { TagGroup } from '@/modules/taskList/components/Tags/model/tags'

export interface UserBoardAccessoriesOnSupabase {
	notes: Notes
	actual_tag_group: TagGroup
	reminders: Reminder
}
