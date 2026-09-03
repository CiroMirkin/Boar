'use client'

import { toast } from 'sonner'
import { Button } from '@/shared/ui/atoms/button'
import getErrorMessageForTheUser from '@/shared/lib/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/features/tasks'
import { useTranslation } from 'react-i18next'
import { ArchiveIcon } from '@/shared/ui/atoms/icons'
import { useTaskBoardQuery } from '@/features/tasks'
import { cleanLastTaskList } from '@/features/tasks'
import { archiveTaskListInTheLastColumn } from '../useCase/archiveTaskList'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { addChangeToEachTaskInList } from '@/features/tasks'
import { useTaskListInEachColumn } from '@/features/tasks'
import { useTheme } from '@/shared/hooks/useTheme'

export function ArchiveTaskListButton() {
	const { t } = useTranslation()
	const color = useTheme()

	const { updateTaskBoard } = useTaskBoardQuery()
	const taskListInEachColumn = useTaskListInEachColumn()
	const canUserArchiveTask = useCheckForTasksInLastColumn()
	const { updateArchivedTasks, archivedTasks } = useArchivedTasksQuery()

	const archiveTaskList = () => {
		try {
			const updatedArchive = archiveTaskListInTheLastColumn({
				archive: archivedTasks,
				taskListInEachColumn: addChangeToEachTaskInList({
					listOfTasksInColumns: taskListInEachColumn,
					taskListIndex: taskListInEachColumn.length - 1,
					columnName: t('archive.archived'),
				}),
			})
			const updatedList = cleanLastTaskList({
				taskListInEachColumn: taskListInEachColumn,
			})

			updateArchivedTasks(updatedArchive)
			updateTaskBoard(updatedList)

			toast.info(t('archive_task_list_toast'))
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
		}
	}

	return (
		<Button
			id='archive_task_list_btn'
			data-testid='BotonParaArchivarUnaListaDeTareas'
			onClick={archiveTaskList}
			variant='ghost'
			className={`w-full mx-4 ${color.columnText}`}
			disabled={canUserArchiveTask}
		>
			<ArchiveIcon className='mr-2' /> {t('archive_task_list_btn')}
		</Button>
	)
}
