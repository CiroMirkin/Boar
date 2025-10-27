import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { deleteThisTask } from '../useCase/deleteTask'
import { useArchivedTasksQuery } from '../ArchivedTasks/hooks/useArchivedTasksQuery'
import { archiveThisTask } from '../ArchivedTasks/useCase/archiveTask'
import { useCallback } from 'react'
import { addChangeToTaskTimelineHistory } from '../useCase/addChangeToTaskTimelineHistory'

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const { updateArchivedTasks, archivedTasks } = useArchivedTasksQuery()

	const archiveTaskAction = useCallback(() => {
		const currentTaskList = listOfTaskInColumns ?? []
		const timelineHistory = addChangeToTaskTimelineHistory({
			task: data,
			columnName: t('archive.archived'),
		})
		const updatedArchive = archiveThisTask({
			task: { ...data, timelineHistory },
			archive: archivedTasks,
		})

		const updatedList = deleteThisTask({
			taskListInEachColumn: currentTaskList,
			task: data,
		})

		updateArchivedTasks(updatedArchive)
		updateListOfTaskInColumns(updatedList)

		toast.info(t('task_buttons.archive_toast'))
	}, [
		data,
		archivedTasks,
		listOfTaskInColumns,
		updateArchivedTasks,
		updateListOfTaskInColumns,
		t,
	])

	return (
		<Button
			size='sm'
			variant='ghost'
			className='w-full'
			onClick={() => handleClick(archiveTaskAction)}
			title={t('task_buttons.archive')}
		>
			<ArchiveIcon />
		</Button>
	)
}
