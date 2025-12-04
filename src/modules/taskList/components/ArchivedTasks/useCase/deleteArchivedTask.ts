import { Archive } from '@/modules/taskList/components/ArchivedTasks/models/archive'
import { taskModel } from '@/modules/TaskBoard/model/task'

interface deleteArchivedTaskParams {
	task: taskModel
	archive: Archive
}

export const deleteThisArchivedTask = ({ task, archive }: deleteArchivedTaskParams): Archive => {
	return archive.map((archived) => ({
		...archived,
		tasklist: archived.tasklist.filter((archivedTask: taskModel) => archivedTask.id !== task.id),
	}))
}
