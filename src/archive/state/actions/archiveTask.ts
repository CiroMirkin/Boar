import { Archive, isItWithinTheDailyArchiveLimit } from '@/archive/models/archive'
import { taskModel } from '@/pages/board/taskList/models/task'
import { getDateOfTheFirstTaskListArchived } from '@/archive/models/archive'
import { getFullDate } from '@/utils/getTime'

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
		const indexOfTheTaskInTheTaskListArchived = 0
		const itemsToBeRemovedOrReplaced = 0
		archive[indexOfTheTaskListArchived].tasklist.splice(
			indexOfTheTaskInTheTaskListArchived,
			itemsToBeRemovedOrReplaced,
			task
		)

		if (isItWithinTheDailyArchiveLimit(archive[indexOfTheTaskListArchived].tasklist)) {
			return archive
		}
	}
	const indexOfTheNewTaskListArchived = 0
	const itemsToBeRemovedOrReplaced = 0
	archive.splice(indexOfTheNewTaskListArchived, itemsToBeRemovedOrReplaced, {
		date,
		tasklist: [task],
	})
	return archive
}
