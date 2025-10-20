import { toast } from 'sonner'
import { Button } from '@/ui/atoms/button'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/sharedByModules/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { cleanLastTaskList } from '../../state/actions/deleteTaskList'
import { archiveTaskListInTheLastColumn } from '../state/actions/archiveTaskList'
import { useArchivedTasksQuery } from '../hooks/useArchivedTasksQuery'
import { emptyTaskListInEachColumn } from '../../models/taskList'

export function ArchiveTaskListButton() {
	const { t } = useTranslation()

	const { listOfTaskInColumns: taskListInEachColumn, updateListOfTaskInColumns } =
		useListOfTasksInColumnsQuery()
	const canUserArchiveTask = useCheckForTasksInLastColumn()
	const { updateArchivedTasks, archivedTasks } = useArchivedTasksQuery()

	const archiveTaskList = () => {
		try {
			const currentTaskList = taskListInEachColumn ?? emptyTaskListInEachColumn
			const updatedArchive = archiveTaskListInTheLastColumn({
				archive: archivedTasks,
				taskListInEachColumn: currentTaskList,
			})
			const updatedList = cleanLastTaskList({
				taskListInEachColumn: currentTaskList,
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
			onClick={archiveTaskList}
			variant='ghost'
			className='w-full mx-4'
			disabled={canUserArchiveTask}
		>
			<ArchiveIcon className='mr-2' /> {t('archive_task_list_btn')}
		</Button>
	)
}
