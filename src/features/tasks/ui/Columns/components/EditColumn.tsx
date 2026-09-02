'use client'

import { KeyboardEvent, useState } from 'react'
import { Button } from '@/shared/ui/atoms/button'
import { PencilIcon } from '@/shared/ui/atoms/icons'
import { Input } from '@/shared/ui/atoms/input'
import { useTheme } from '@/shared/hooks/useTheme'
import { isThisColumnNameWithinTheLimitOfLetters } from '@/features/tasks/model/taskColumn'
import { Column } from '../model/column'
import { useTaskBoardQuery } from '@/features/tasks/hooks/useTaskBoardQuery'
import { changeStatusName } from '@/features/tasks/useCase/changeStatusName'
import { useTranslation } from 'react-i18next'
import DeleteColumnBtn from './DeleteColumnBtn'
import { DEFAULT_COLUMN_IDS } from '@/features/tasks/model/taskBoard'

interface EditColumnParams {
	column: Column
}

export function EditColumn({ column }: EditColumnParams) {
	const id = column.id
	const { t } = useTranslation()
	const [showChangeColumnNameInput, setShowChangeColumnNameInput] = useState(false)
	const [columnName, setColumnName] = useState(column.name)

	const displayName = DEFAULT_COLUMN_IDS.includes(column.name)
		? t(`default_columns.${column.name}`)
		: column.name

	const nameToShow = showChangeColumnNameInput ? columnName : displayName
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

	const handleSaveShortcut = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && showChangeColumnNameInput) {
			editColumnNameHandle()
		}
	}

	const { task } = useTheme()
	return (
		<li className={'w-full p-4 grid grid-cols-4 gap-2 justify-between rounded-lg ' + task}>
			<Input
				className='md:col-span-3 col-span-2'
				value={nameToShow}
				name={nameToShow}
				onChange={(e) =>
					isThisColumnNameWithinTheLimitOfLetters(e.target.value) &&
					setColumnName(e.target.value)
				}
				onKeyDown={handleSaveShortcut}
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
