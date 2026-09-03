import { Archive } from '@/features/archived-tasks/model/archive'
import { useArchivedTasksQuery } from './useArchivedTasksQuery'

export const useArchive = (): Archive => {
	const { archivedTasks } = useArchivedTasksQuery()
	return archivedTasks
}
