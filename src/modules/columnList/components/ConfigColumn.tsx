import { useState } from 'react'
import { Column, isThisColumnNameWithinTheLimitOfLetters } from '../models/column'
import { Button } from '../../../ui/atoms/button'
import { toast } from 'sonner'
import { PencilIcon, TrashIcon } from '@/ui/atoms/icons'
import { Input } from '@/ui/atoms/input'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useTranslation } from 'react-i18next'
import { useDeleteColumn } from '../../../sharedByModules/hooks/useDeleteColumn'
import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { useColumnListQuery } from '../hooks/useColumnListQuery'
import { changeNameOfColumn } from '../useCase/changeColumnName'

interface ConfigColumnParams {
	column: Column
}

export function ConfigColumn({ column }: ConfigColumnParams) {
	const { t } = useTranslation()
	const [showChangeColumnNameInput, setShowChangeColumnNameInput] = useState(false)
	const [columnName, setColumnName] = useState(column.name)

	const nameToShow = showChangeColumnNameInput ? columnName : column.name
	const { columnList, updateColumnList } = useColumnListQuery()

	const editColumnNameHandle = () => {
		if (showChangeColumnNameInput) {
			const updatedColumnList = changeNameOfColumn({
				columnList: columnList || [],
				column,
				newName: columnName,
			})
			updateColumnList(updatedColumnList)
		} else {
			setColumnName(column.name)
		}
		setShowChangeColumnNameInput(!showChangeColumnNameInput)
	}

	const deleteColumn = useDeleteColumn()
	const deleteColumnHandle = () => deleteColumn({ column })

	const askForConfirmationToDeleteTheColumn = () => {
		toast.warning(`${t('settings.columns.delete_column_warning')} "${columnName}"?`, {
			action: {
				label: t('task_buttons.delete'),
				onClick: deleteColumnHandle,
			},
		})
	}

	const handleClick = (action: () => void) => {
		try {
			action()
		} catch (error) {
			toast.error(getErrorMessageForTheUser(error))
		}
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
					onClick={() => handleClick(editColumnNameHandle)}
					variant='ghost'
					data-testid='BotonParaCambiarElNombreDeUnaColumna'
				>
					<PencilIcon />
				</Button>
				<Button
					onClick={() => handleClick(askForConfirmationToDeleteTheColumn)}
					variant='destructiveGhost'
					data-testid='BotonParaEliminarUnaColumna'
					title={t('settings.columns.delete_column_btn')}
				>
					<TrashIcon />
				</Button>
			</div>
		</li>
	)
}
