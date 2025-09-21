import { Button } from '@/ui/atoms/button'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { archiveTask } from '../ArchivedTasks/state/archiveReducer'
import { deleteTask } from '../state/taskListInEachColumnReducer'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { useSession } from '@/auth/hooks/useSession'
import { useSaveArchive } from '../ArchivedTasks/state/useSaveArchive'
import { getActalArchive } from '../ArchivedTasks/state/getActualArchive'
import { ArchiveIcon } from '@/ui/atoms/icons'

interface ArchiveTaskButtonProps {
	handleClick: (action: () => void) => void
}

export function ArchiveTaskButton({ handleClick }: ArchiveTaskButtonProps) {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const data = useDataOfTheTask()
	const { session } = useSession()
	const saveArchive = useSaveArchive()
	const useArchiveTaskAction = () => {
		dispatch(archiveTask(data))
		dispatch(deleteTask(data))
		saveArchive({
			session,
			archive: getActalArchive(),
		})
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
