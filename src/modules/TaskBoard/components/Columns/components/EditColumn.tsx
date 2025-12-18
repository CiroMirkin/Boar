import { useState } from 'react'
import { Button } from '@/ui/atoms/button'
import { PencilIcon } from '@/ui/atoms/icons'
import { Input } from '@/ui/atoms/input'
import { useTheme } from '@/commond/hooks/useTheme'
import { isThisColumnNameWithinTheLimitOfLetters } from '@/modules/TaskBoard/model/taskColumn'
import { Column } from '../model/column'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { changeStatusName } from '@/modules/TaskBoard/components/taskList/useCase/changeStatusName'
import DeleteColumnBtn from './DeleteColumnBtn'

interface EditColumnParams {
	column: Column
}

export function EditColumn({ column }: EditColumnParams) {
	const id = column.id
	const [showChangeColumnNameInput, setShowChangeColumnNameInput] = useState(false)
	const [columnName, setColumnName] = useState(column.name)

	const nameToShow = showChangeColumnNameInput ? columnName : column.name
	const { updateTaskBoard, taskBoard } = useTaskBoardQuery()

	const editColumnNameHandle = () => {
		if (showChangeColumnNameInput) {
			const updatedColumnList = changeStatusName({
				taskBoard,
				id,
				newName: columnName,
			})
			updateTaskBoard(updatedColumnList)
		} else {
			setColumnName(column.name)
		}
		setShowChangeColumnNameInput(!showChangeColumnNameInput)
	}

	const { task } = useTheme()
	return (
		<li
			key={column.id}
			className={'w-full p-4 grid grid-cols-4 gap-2 justify-between rounded-lg ' + task}
		>
			<Input
				className='md:col-span-3 col-span-2'
				value={nameToShow}
				name={nameToShow}
				onChange={(e) =>
					isThisColumnNameWithinTheLimitOfLetters(e.target.value) &&
					setColumnName(e.target.value)
				}
				disabled={!showChangeColumnNameInput}
			/>
			<div className='w-full flex gap-2'>
				<Button
					onClick={() => editColumnNameHandle()}
					variant='ghost'
					data-testid='BotonParaCambiarElNombreDeUnaColumna'
				>
					<PencilIcon />
				</Button>
				<DeleteColumnBtn column={column} />
			</div>
		</li>
	)
}
