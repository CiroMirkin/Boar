import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { deleteThisTask } from '../useCase/deleteTask'
import { useArchivedTasksQuery } from '../components/ArchivedTasks/hooks/useArchivedTasksQuery'
import { archiveThisTask } from '../components/ArchivedTasks/useCase/archiveTask'
import { useCallback } from 'react'
import { addChangeToTaskTimelineHistory } from '../useCase/addChangeToTaskTimelineHistory'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const { updateArchivedTasks, archivedTasks } = useArchivedTasksQuery()

	const archiveTaskAction = useCallback(() => {
		const timelineHistory = addChangeToTaskTimelineHistory({
			task: data,
			columnName: t('archive.archived'),
		})
		const updatedArchive = archiveThisTask({
			task: { ...data, timelineHistory },
			archive: archivedTasks,
		})

		const updatedList = deleteThisTask({
			taskListInEachColumn: listOfTaskInColumns,
			task: data,
		})

		updateArchivedTasks(updatedArchive)
		updateTaskBoard(updatedList)

		toast.info(t('task_buttons.archive_toast'))
	}, [data, archivedTasks, listOfTaskInColumns, updateArchivedTasks, updateTaskBoard, t])

	return (
		<Button
			size='sm'
			variant='ghost'
			className='w-full'
			data-testid='BotonParaArchivarUnaTarea'
			onClick={() => handleClick(archiveTaskAction)}
			title={t('task_buttons.archive')}
		>
			<ArchiveIcon />
		</Button>
	)
}
