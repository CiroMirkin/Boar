import { useDispatch } from "react-redux"
import { moveTaskToNextColumn, moveTaskToPrevColumn } from "../state/taskListInEachColumnReducer"
import { useTranslation } from "react-i18next"
import { useCheckIfThisTaskIsInTheFirstColumn } from '@/sharedByModules/hooks/useCheckIfThisTaskIsInTheFirstColumn'
import { useCheckIfTaskIsInTheLastColumn } from '@/sharedByModules/hooks/useCheckIfTaskIsInTheLastColumn'
import { Button } from "@/ui/atoms/button"
import { useDataOfTheTask } from "../hooks/useDataOfTheTask"
import { ArrowLeftIcon, ArrowRightIcon } from "@/ui/atoms/icons"

interface MoveButtonsProps {
	handleClick: (action: () => void) => void
}

export function MoveButttons({ handleClick }: MoveButtonsProps) {
	const { t } = useTranslation()
	const data = useDataOfTheTask()
	const isTheTaskInTheFirstColumn = useCheckIfThisTaskIsInTheFirstColumn(data)
	const isTheTaskInTheLastColumn = useCheckIfTaskIsInTheLastColumn(data)
	const dispatch = useDispatch()
	const moveTaskToNextColumnAction = () => dispatch(moveTaskToNextColumn(data))
	const moveTaskToPrevColumnAction = () => dispatch(moveTaskToPrevColumn(data))
   
	
	return (
        <>
            <Button
				size='sm'
				disabled={isTheTaskInTheFirstColumn}
				variant={isTheTaskInTheFirstColumn ? 'ghost' : 'default'}
				onClick={() => handleClick(moveTaskToPrevColumnAction)}
				title={t('task_buttons.prev_btn')}
			>
				<ArrowLeftIcon />
			</Button>
			<Button
				size='sm'
				disabled={isTheTaskInTheLastColumn}
				variant={isTheTaskInTheLastColumn ? 'ghost' : 'default'}
				onClick={() => handleClick(moveTaskToNextColumnAction)}
				title={t('task_buttons.next_btn')}
			>
				<ArrowRightIcon />
			</Button>
        </>
    )
}