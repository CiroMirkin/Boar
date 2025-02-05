import { archiveTaskListAtLastColumn } from '@/redux/archiveReducer'
import { cleanTheLastTaskList } from '@/pages/board/taskList/state/taskListInEachColumnReducer'
import { useToast } from '@/ui/use-toast'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { TaskListInEachColumnContext } from '@/pages/board/taskList/contexts/TaskListInEachColumnContext'
import { Button } from '@/ui/button'
import { Archive } from 'lucide-react'
import { iconSize } from '@/configs/iconsConstants'
import getErrorMessageForTheUser from '@/utils/getErrorMessageForTheUser'
import { useCheckForTasksInLastColumn } from '@/pages/board/columnList/hooks/useCheckForTasksInLastColumn'

export function ArchiveTaskListButton() {
	const { toast } = useToast()

	const dispatch = useDispatch()

	const taskListInEachColumn = useContext(TaskListInEachColumnContext)
	const canUserArchiveTask = useCheckForTasksInLastColumn()

	const archiveTaskList = () => {
		try {
			dispatch(archiveTaskListAtLastColumn(taskListInEachColumn))
			dispatch(cleanTheLastTaskList())
			toast({
				description: 'Consulta las tareas archivadas en el menú.',
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
			<Archive size={iconSize} className='mr-2' /> Archivar tareas
		</Button>
	)
}
