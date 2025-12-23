import { Archive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/models/archive'
import { useArchivedTasksQuery } from './useArchivedTasksQuery'

export const useArchive = (): Archive => {
	const { archivedTasks } = useArchivedTasksQuery()
	return archivedTasks
}
