import { archiveTaskListAtLastColumn } from '@/modules/archive/state/archiveReducer'
import { cleanTheLastTaskList } from '@/modules/columnList/taskList/state/taskListInEachColumnReducer'
import { useToast } from '@/ui/use-toast'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { TaskListInEachColumnContext } from '@/modules/columnList/taskList/contexts/TaskListInEachColumnContext'
import { Button } from '@/ui/button'
import { Archive } from 'lucide-react'
import { iconSize } from '@/modules/shared/configs/iconsConstants'
import getErrorMessageForTheUser from '@/modules/shared/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/modules/columnList/hooks/useCheckForTasksInLastColumn'
import { useTranslation } from 'react-i18next'

export function ArchiveTaskListButton() {
	const { toast } = useToast()
	const { t } = useTranslation()

	const dispatch = useDispatch()

	const taskListInEachColumn = useContext(TaskListInEachColumnContext)
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
