import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '../../Columns/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '@/modules/taskList/hooks/useListOfTasksInColumnsQuery'
import { cleanLastTaskList } from '@/modules/taskList/useCase/deleteTaskList'
import { archiveTaskListInTheLastColumn } from '../useCase/archiveTaskList'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { addChangeToEachTaskInList } from '@/modules/taskList/useCase/addChangeToEachTaskInList'
import { useTaskListInEachColumn } from '@/modules/taskList/hooks/useTaskListInEachColumn'

export function ArchiveTaskListButton() {
	const { t } = useTranslation()

	const { updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
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
			updateListOfTaskInColumns(updatedList)

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
			className='w-full mx-4'
			disabled={canUserArchiveTask}
		>
			<ArchiveIcon className='mr-2' /> {t('archive_task_list_btn')}
		</Button>
	)
}
