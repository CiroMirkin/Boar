import { toast } from 'sonner'
import { useCheckIfTaskIsInTheLastColumn } from '@/modules/TaskBoard/components/Columns/hooks/useCheckIfTaskIsInTheLastColumn'
import getErrorMessageForTheUser from '@/common/utils/getErrorMessageForTheUser'
import { MoveButttons } from './MoveButtons'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { CopyTextButton } from './CopyTextButton'
import { ArchiveTaskButton } from './ArchiveTaskButton'
import { DeleteTaskButton } from './DeleteTaskButton'
import ShowTaskNotesEditor from './ShowTaskNotesEditor'

export function TaskInBoardActions() {
	const data = useDataOfTheTask()
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)

	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
		}
	}

	return (
		<div className='w-full flex flex-wrap justify-between gap-1.5'>
			<div className='flex'>
				<MoveButttons handleClick={handleClick} />
			</div>
			<div className='flex'>
				<CopyTextButton />
				<ShowTaskNotesEditor />
				{isTheTaskInTheLastColumn && <ArchiveTaskButton handleClick={handleClick} />}
				<DeleteTaskButton handleClick={handleClick} />
			</div>
		</div>
	)
}
