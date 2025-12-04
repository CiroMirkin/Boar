import { useTranslation } from 'react-i18next'
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/modules/TaskBoard/components/Columns/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/modules/TaskBoard/components/Columns/hooks/useCheckIfTaskIsInTheLastColumn'
import { Button } from '@/ui/atoms/button'
import { useDataOfTheTask } from '../hooks/useDataOfTheTask'
import { ArrowLeftIcon, ArrowRightIcon } from '@/ui/atoms/icons'
import { useTaskBoardQuery } from '../../TaskBoard/hooks/useTaskBoardQuery'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'
import { moveThisTaskToTheNextColumn, moveThisTaskToThePrevColumn } from '../useCase/moveTask'
import { addChangeToTaskTimelineHistory } from '../useCase/addChangeToTaskTimelineHistory'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'
import { useGetColumnNameFromTask } from '@/modules/TaskBoard/components/Columns/hooks/useGetColumnNameFromTask'

interface MoveButtonsProps {
	handleClick: (action: () => void) => void
}

export function MoveButttons({ handleClick }: MoveButtonsProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const getColumnName = useGetColumnNameFromTask()
	const { updateTaskBoard } = useTaskBoardQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)
	const moveTaskToNextColumnAction = () => {
		const task = {
			...data,
			timelineHistory: addChangeToTaskTimelineHistory({
				task: data,
				columnName: getColumnName(data),
			}),
		}
		const updatedList = sortListOfTasksInColumnsByPriority(
			moveThisTaskToTheNextColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task,
			})
		)
		updateTaskBoard(updatedList)
	}
	const moveTaskToPrevColumnAction = () => {
		const task = {
			...data,
			timelineHistory: addChangeToTaskTimelineHistory({
				task: data,
				columnName: getColumnName(data),
			}),
		}
		const updatedList = sortListOfTasksInColumnsByPriority(
			moveThisTaskToThePrevColumn({
				taskListInEachColumn: listOfTaskInColumns || [],
				task,
			})
		)
		updateTaskBoard(updatedList)
	}

	return (
		<>
			<Button
				size='sm'
				disabled={isTheTaskInTheFirstColumn}
				variant='ghost'
				data-testid='BotonParaRetrocederTarea'
				onClick={() => handleClick(moveTaskToPrevColumnAction)}
				title={t('task_buttons.prev_btn')}
			>
				<ArrowLeftIcon />
			</Button>
			<Button
				size='sm'
				disabled={isTheTaskInTheLastColumn}
				variant='ghost'
				data-testid='BotonParaAvanzarTarea'
				onClick={() => handleClick(moveTaskToNextColumnAction)}
				title={t('task_buttons.next_btn')}
			>
				<ArrowRightIcon />
			</Button>
		</>
	)
}
