import { useTranslation } from 'react-i18next'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/sharedByModules/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/sharedByModules/hooks/useCheckIfTaskIsInTheLastColumn'
import { Button } from '@/ui/atoms/button'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { ArrowLeftIcon, ArrowRightIcon } from '@/ui/atoms/icons'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from '../useCase/moveTask'

interface MoveButtonsProps {
	handleClick: (action: () => void) => void
}

export function MoveButttons({ handleClick }: MoveButtonsProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const { listOfTaskInColumns, updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)
	const moveTaskToNextColumnAction = () => {
		const updatedList = sortListOfTasksInColumnsByPriority(
			moveThisTaskToTheNextColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task: data,
			})
		)
		updateListOfTaskInColumns(updatedList)
	}
	const moveTaskToPrevColumnAction = () => {
		const updatedList = sortListOfTasksInColumnsByPriority(
			moveThisTaskToThePrevColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task: data,
			})
		)
		updateListOfTaskInColumns(updatedList)
	}

	return (
		<>
			<Button
				size='sm'
				disabled={isTheTaskInTheFirstColumn}
				variant='ghost'
				onClick={() => handleClick(moveTaskToPrevColumnAction)}
				title={t('task_buttons.prev_btn')}
			>
				<ArrowLeftIcon />
			</Button>
			<Button
				size='sm'
				disabled={isTheTaskInTheLastColumn}
				variant='ghost'
				onClick={() => handleClick(moveTaskToNextColumnAction)}
				title={t('task_buttons.next_btn')}
			>
				<ArrowRightIcon />
			</Button>
		</>
	)
}
