import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import getErrorMessageForTheUser from '@/commond/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/modules/TaskBoard/components/Columns/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { cleanLastTaskList } from '@/modules/TaskBoard/components/taskList/useCase/deleteTaskList'
import { archiveTaskListInTheLastColumn } from '../useCase/archiveTaskList'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { addChangeToEachTaskInList } from '@/modules/TaskBoard/components/taskList/useCase/addChangeToEachTaskInList'
import { useTaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/hooks/useTaskListInEachColumn'
import { useTheme } from '@/commond/hooks/useTheme'

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
