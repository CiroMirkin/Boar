import { archiveTaskListAtLastColumn } from '@/modules/taskList/ArchivedTasks/state/archiveReducer'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { Button } from '@/ui/atoms/button'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/sharedByModules/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { useSaveArchive } from '../state/useSaveArchive'
import { useSession } from '@/auth/hooks/useSession'
import { getActalArchive } from '../state/getActualArchive'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '../../hooks/useListOfTasksInColumnsQuery'
import { cleanLastTaskList } from '../../state/actions/deleteTaskList'

export function ArchiveTaskListButton() {
	const { t } = useTranslation()

	const { listOfTaskInColumns: taskListInEachColumn, updateListOfTaskInColumns } =
		useListOfTasksInColumnsQuery()

	const canUserArchiveTask = useCheckForTasksInLastColumn()

	const dispatch = useDispatch()
	const { session } = useSession()

	const saveArchive = useSaveArchive()
	const archiveTaskList = () => {
		try {
			dispatch(archiveTaskListAtLastColumn(taskListInEachColumn || []))
			const updatedList = cleanLastTaskList({
				taskListInEachColumn: taskListInEachColumn || [],
			})
			updateListOfTaskInColumns(updatedList)
			saveArchive({
				session,
				archive: getActalArchive(),
			})
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
