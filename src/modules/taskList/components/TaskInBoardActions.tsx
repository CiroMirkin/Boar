import { toast } from "sonner"
import { useCheckIfTaskIsInTheLastColumn } from '@/sharedByModules/hooks/useCheckIfTaskIsInTheLastColumn'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { MoveButttons } from './MoveButtons'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { CopyTextButton } from './CopyTextButton'
import { ArchiveTaskButton } from './ArchiveTaskButton'
import { DeleteTaskButton } from './DeleteTaskButton'

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
		<div className="w-full flex justify-between gap-1.5">
			<div className='flex'>
				<MoveButttons handleClick={handleClick} />
			</div>
			<div className="flex">
				<CopyTextButton />			
				{isTheTaskInTheLastColumn && <ArchiveTaskButton handleClick={handleClick} />}
				<DeleteTaskButton handleClick={handleClick} />
			</div>
		</div>
	)
}
