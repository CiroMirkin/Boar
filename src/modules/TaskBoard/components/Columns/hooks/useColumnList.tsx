import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { Column } from '../model/column'

export const useColumnList = (): Column[] => {
	const { taskBoard } = useTaskBoardQuery()

	return taskBoard.map((list) => ({
		id: list.id,
		name: list.status,
	}))
}
