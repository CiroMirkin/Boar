import { useToast } from '@/ui/use-toast'
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
	const { toast } = useToast()
	
	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast({
				description: getErrorMessageForTheUser(error),
				variant: 'destructive',
				duration: 3000,
			})
		}
	}

	return (
		<>
			<div className='w-full grid grid-flow-col justify-stretch gap-1.5'>
				<MoveButttons handleClick={handleClick} />
			</div>
			<CopyTextButton />			
			{isTheTaskInTheLastColumn && <ArchiveTaskButton handleClick={handleClick} />}
			<DeleteTaskButton handleClick={handleClick} />
		</>
	)
}
