import { Archive } from '@/modules/taskList/components/ArchivedTasks/models/archive'
import { useArchivedTasksQuery } from './useArchivedTasksQuery'

export const useArchive = (): Archive => {
	const { archivedTasks } = useArchivedTasksQuery()
	return archivedTasks
}
