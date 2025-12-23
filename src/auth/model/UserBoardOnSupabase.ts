import { TaskBoard } from '@/modules/TaskBoard/model/taskBoard'

export interface UserBoardOnSupabase {
	id: string
	user_id: string | undefined
	name: string
	task_list_in_each_column: TaskBoard
}
