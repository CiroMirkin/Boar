import { isDefaultBoardName } from '@/modules/board/models/board'
import { defaultNotes } from '@/modules/notes/model/notes'
import { emptyTaskBoard } from '@/modules/TaskBoard/model/taskBoard'

/**
 * Checks localStorage to see if the user still has the default (empty) guest board.
 * Returns true if the board is default/empty — meaning there is nothing to lose on sign-in.
 */
export const checkIfUserHasTheDefaultBoard = async (): Promise<boolean> => {
	if (typeof window === 'undefined') return true

	const rawBoard = localStorage.getItem('board-boar')
	const board = rawBoard ? JSON.parse(rawBoard) : null
	const boardName: string = board?.name ?? ''

	const rawTasks = localStorage.getItem('taskListInEachColumn')
	const taskList = rawTasks ? JSON.parse(rawTasks) : emptyTaskBoard

	const notes = localStorage.getItem('boar-notes') ?? defaultNotes

	return (
		isDefaultBoardName(boardName) &&
		JSON.stringify(taskList) === JSON.stringify(emptyTaskBoard) &&
		notes === defaultNotes
	)
}
