import { Archive } from '@/models/archive'
import { taskModel } from '@/board/taskList/models/task'

interface deleteArchivedTaskParams {
	task: taskModel
	archive: Archive
}

export const deleteThisArchivedTask = ({ task, archive }: deleteArchivedTaskParams): Archive => {
	const updatedArchive = archive.map((archived) => {
		archived.tasklist = archived.tasklist.filter((archivedTask) => archivedTask.id !== task.id)
		return archived
	})
	return updatedArchive
}
