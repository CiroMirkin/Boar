import { Archive } from '@/features/archived-tasks/model/archive'
import { taskModel } from '@/features/tasks'

interface deleteArchivedTaskParams {
	task: taskModel
	archive: Archive
}

export const deleteThisArchivedTask = ({ task, archive }: deleteArchivedTaskParams): Archive => {
	return archive.map((archived) => ({
		...archived,
		tasklist: archived.tasklist.filter(
			(archivedTask: taskModel) => archivedTask.id !== task.id
		),
	}))
}
