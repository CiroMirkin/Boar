import BusinessError from '@/sharedByModules/errors/businessError'
import { TaskList } from '@/modules/taskList/models/taskList'
import { getFullDate } from '../../../../../sharedByModules/utils/getTime'
import {
	Archive,
	isItWithinTheArchiveLimit,
	isItWithinTheDailyArchiveLimit,
} from '@/modules/taskList/ArchivedTasks/models/archive'
import { getDateOfTheFirstTaskListArchived } from '@/modules/taskList/ArchivedTasks/models/archive'

interface archiveTaskListParams {
	taskListInEachColumn: TaskList[]
	archive: Archive
}
export function archiveTaskListInTheLastColumn({
	taskListInEachColumn,
	archive,
}: archiveTaskListParams): Archive {
	const date = getFullDate()
	const lastColumnIndex = taskListInEachColumn.length - 1
	const taskListToArchive: TaskList = taskListInEachColumn[lastColumnIndex]

	if (isTaskListEmpty(taskListToArchive)) {
		throw new BusinessError('No hay tareas que archivar.')
	}

	const firstArchivedDate = getDateOfTheFirstTaskListArchived(archive)

	if (firstArchivedDate === date) {
		const mergedTaskList: TaskList = [...taskListToArchive, ...archive[0].tasklist]
		
		if (isItWithinTheDailyArchiveLimit(mergedTaskList)) {
			return archive.map((archi) => {
				if (archi.date === date) {
					return {
						...archi,
						tasklist: mergedTaskList,
					}
				}
				return { ...archi }
			})
		}
	}

	if (isItWithinTheArchiveLimit(archive) && isItWithinTheDailyArchiveLimit(taskListToArchive)) {
		const newArchiveEntry = {
			date,
			tasklist: [...taskListToArchive],
		}
		
		return [newArchiveEntry, ...archive]
	}

	return archive
}

const isTaskListEmpty = (taskList: TaskList): boolean => taskList.length === 0