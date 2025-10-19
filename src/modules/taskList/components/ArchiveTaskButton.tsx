import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { ArchiveIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { deleteThisTask } from '../state/actions/deleteTask'
import { useArchivedTasksQuery } from '../ArchivedTasks/hooks/useArchivedTasksQuery'
import { archiveThisTask } from '../ArchivedTasks/state/actions/archiveTask'

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const { updateArchivedTasks, archivedTasks } = useArchivedTasksQuery()

	const useArchiveTaskAction = () => {
		const archive = archiveThisTask({
			task: data,
			archive: archivedTasks,
		})
		updateArchivedTasks(archive)

		const updatedList = deleteThisTask({
			taskListInEachColumn: listOfTaskInColumns || [],
			task: data,
		})
		updateListOfTaskInColumns(updatedList)
		toast.info(t('task_buttons.archive_toast'))
	}

	return (
		<Button
			size='sm'
			variant='ghost'
			className='w-full'
			onClick={() => handleClick(useArchiveTaskAction)}
			title={t('task_buttons.archive')}
		>
			<ArchiveIcon />
		</Button>
	)
}
