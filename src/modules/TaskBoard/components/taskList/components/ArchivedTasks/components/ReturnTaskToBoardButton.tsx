import { useContext } from 'react'
import { TaskContext } from '@/ui/organisms/BlankTask'
import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { addTaskInTheLastColumn } from '@/modules/TaskBoard/components/taskList/useCase/addTask'
import { sortListOfTasksInColumnsByPriority } from '@/modules/TaskBoard/components/taskList/models/sortListOfTasksInColumnsByPriority'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { deleteThisArchivedTask } from '../useCase/deleteArchivedTask'
import { addChangeToTaskTimelineHistory } from '@/modules/TaskBoard/components/taskList/useCase/addChangeToTaskTimelineHistory'
import { useTaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/hooks/useTaskListInEachColumn'

export function ReturnTaskToBoardButton() {
	const { t } = useTranslation()
	const task = useContext(TaskContext)
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const { archivedTasks, updateArchivedTasks } = useArchivedTasksQuery()

	const returnTaskToLastColumnAction = () => {
		const timelineHistory = addChangeToTaskTimelineHistory({
			task,
			columnName: t('archive.unarchived'),
		})
		const updatedListOfTaskInColumns = sortListOfTasksInColumnsByPriority(
			addTaskInTheLastColumn({
				taskListInEachColumn: listOfTaskInColumns,
				task: { ...task, timelineHistory },
			})
		)
		updateTaskBoard(updatedListOfTaskInColumns)

		const updatedArchivedTasks = deleteThisArchivedTask({
			task,
			archive: archivedTasks,
		})
		updateArchivedTasks(updatedArchivedTasks)

		toast.info(t('archive.return_task_to_board_toast'))
	}

	return (
		<Button
			size='sm'
			onClick={returnTaskToLastColumnAction}
			variant='ghost'
			className='w-full'
			data-testid='BotonParaDevolverUnaTareaArchivadaAlTablero'
		>
			{t('archive.return_task_to_board_btn')}
		</Button>
	)
}
