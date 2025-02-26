import { archiveTaskListAtLastColumn } from '@/modules/taskList/archive/state/archiveReducer'
import { cleanTheLastTaskList } from '@/modules/taskList/state/taskListInEachColumnReducer'
import { useToast } from '@/ui/use-toast'
import { useDispatch } from 'react-redux'
import { Button } from '@/ui/button'
import { Archive } from 'lucide-react'
import { iconSize } from '@/shared/configs/iconsConstants'
import getErrorMessageForTheUser from '@/shared/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/shared/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'
import { useTaskListInEachColumn } from '@/modules/taskList/hooks/useTaskListInEachColumn'

export function ArchiveTaskListButton() {
	const { toast } = useToast()
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const taskListInEachColumn = useTaskListInEachColumn()
	const canUserArchiveTask = useCheckForTasksInLastColumn()

	const archiveTaskList = () => {
		try {
			dispatch(archiveTaskListAtLastColumn(taskListInEachColumn))
			dispatch(cleanTheLastTaskList())
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
			onClick={archiveTaskList}
			variant='ghost'
			className='w-full'
			disabled={canUserArchiveTask}
		>
			<Archive size={iconSize} className='mr-2' /> {t('archive_task_list_btn')}
		</Button>
	)
}
