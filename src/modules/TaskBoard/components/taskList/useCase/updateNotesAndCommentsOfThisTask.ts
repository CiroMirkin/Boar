import { checkMaxLengthOfNotesAndComments } from '../models/NotesAndComments'
import { taskModel } from '@/modules/TaskBoard/model/task'
import { TaskListInEachColumn } from '../models/taskListInEachColumn'

interface updateNotesAndCommentsOfThisTaskParams {
	taskToUpdate: taskModel
	notes: string
	listOfTaskInColumns: TaskListInEachColumn
}

export const updateNotesAndCommentsOfThisTask = ({
	taskToUpdate,
	notes,
	listOfTaskInColumns,
}: updateNotesAndCommentsOfThisTaskParams): TaskListInEachColumn => {
	return listOfTaskInColumns.map((taskList) => {
		return taskList.map((task) =>
			task.id === taskToUpdate.id && checkMaxLengthOfNotesAndComments(notes)
				? {
						...task,
						notesAndComments: notes,
					}
				: task
		)
	})
}
