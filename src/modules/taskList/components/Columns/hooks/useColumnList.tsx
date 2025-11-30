import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'
import { Column } from '../model/column'

export const useColumnList = (): Column[] => {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()

	return listOfTaskInColumns.map((list) => ({
		id: list.id,
		name: list.status,
	}))
}
