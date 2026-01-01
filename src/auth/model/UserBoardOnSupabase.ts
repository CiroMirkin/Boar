import BusinessError from '@/common/errors/businessError'
import { emptyTaskBoard, TaskBoard } from '@/modules/TaskBoard/model/taskBoard'

export interface UserBoardOnSupabase {
	id?: string
	user_id: string | undefined
	name: string
	task_list_in_each_column: TaskBoard
}

interface RequiredNewBoardData {
	name: string
	user_id: string | undefined
}

export const getDefaultSupabaseBoard = ({
	name,
	user_id,
}: RequiredNewBoardData): UserBoardOnSupabase => {
	if (!user_id || user_id === undefined) {
		throw new BusinessError('user_id faltante para crear un nuevo tablero')
	}

	if (!name.trim) {
		throw new BusinessError('No es posible crear un tablero sin nombre')
	}

	return {
		name,
		user_id,
		task_list_in_each_column: emptyTaskBoard,
	}
}
