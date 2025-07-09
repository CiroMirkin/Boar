import { archiveTaskListAtLastColumn } from '@/modules/taskList/archive/state/archiveReducer'
import { cleanTheLastTaskList } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import { Button } from '@/ui/button'
import { Archive } from 'lucide-react'
import { iconSize } from '@/sharedByModules/configs/iconsConstants'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/sharedByModules/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { useTaskListInEachColumn } from '@/modules/taskList/hooks/useTaskListInEachColumn'
import { useSaveArchive } from '../state/useSaveArchive'
import { useSession } from '@/SessionProvider'
import { getActalArchive } from '../state/getActualArchive'

export function ArchiveTaskListButton() {
	const { toast } = useToast()
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const taskListInEachColumn = useTaskListInEachColumn()
	const canUserArchiveTask = useCheckForTasksInLastColumn()

	const { session } = useSession()
	const archiveTaskList = () => {
		try {
			dispatch(archiveTaskListAtLastColumn(taskListInEachColumn))
			dispatch(cleanTheLastTaskList())
			useSaveArchive({ 
				session, 
				archive: getActalArchive()
			})
			toast({
				description: t('archive_task_list_toast'),
				duration: 3000,
			})
		} catch (error) {
			toast({
				description: getErrorMessageForTheUser(error),
				variant: 'destructive',
				duration: 3000,
			})
		}
	}

	return (
		<Button
			id="archive_task_list_btn"
			onClick={archiveTaskList}
			variant='ghost'
			className='w-full mx-4'
			disabled={canUserArchiveTask}
		>
			<Archive size={iconSize} className='mr-2' /> {t('archive_task_list_btn')}
		</Button>
	)
}
