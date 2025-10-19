import {
	Archive,
	isItWithinTheDailyArchiveLimit,
} from '@/modules/taskList/ArchivedTasks/models/archive'
import { taskModel } from '@/modules/taskList/models/task'
import { getDateOfTheFirstTaskListArchived } from '@/modules/taskList/ArchivedTasks/models/archive'
import { getFullDate } from '@/sharedByModules/utils/getTime'

export const archiveThisTask = ({
	task,
	archive,
}: {
	task: taskModel
	archive: Archive
}): Archive => {
	const date = getFullDate()

	if (getDateOfTheFirstTaskListArchived(archive) === date) {
		const indexOfTheTaskListArchived = 0

		const updatedArchive = [...archive]
		const updatedTaskList = [...updatedArchive[indexOfTheTaskListArchived].tasklist]

		const indexOfTheTaskInTheTaskListArchived = 0
		updatedTaskList.splice(indexOfTheTaskInTheTaskListArchived, 0, task)

		updatedArchive[indexOfTheTaskListArchived] = {
			...updatedArchive[indexOfTheTaskListArchived],
			tasklist: updatedTaskList,
		}

		if (isItWithinTheDailyArchiveLimit(updatedTaskList)) {
			return updatedArchive
		}

		return [{ date, tasklist: [task] }, ...updatedArchive]
	}

	return [{ date, tasklist: [task] }, ...archive]
}
