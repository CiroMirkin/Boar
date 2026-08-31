'use client'

import { Input } from '@/ui/atoms/input'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from '@/ui/atoms/button'
import { PencilIcon } from '@/ui/atoms/icons'
import { Label } from '@/ui/atoms/label'
import { isThisBoardNameWithinTheLimitOfLetters } from '@/modules/board/models/board'
import { changeBoardName } from '@/modules/board/useCase/changeBoardName'
import getErrorMessageForTheUser from '@/common/utils/getErrorMessageForTheUser'
import { toast } from 'sonner'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/ui/organisms/SettingSection'
import { useTheme } from '@/common/hooks/useTheme'

interface Props {
	id: string
}

export function ChangeBoardName({ id }: Props) {
	const { board, updateBoard } = useBoardQuery(id)

	const color = useTheme()
	const [boardName, setBoardName] = useState(board?.name || '')
	const [inputDisabled, setInputDisabled] = useState(true)

	const nameToShow = inputDisabled ? board?.name || '' : boardName

	const saveNewBoardName = () => {
		if (board) {
			const updatedBoard = changeBoardName({ board, newName: boardName })
			updateBoard(updatedBoard)
			setInputDisabled(true)
		}
	}

	const handleClick = () => {
		try {
			if (inputDisabled) {
				setBoardName(board?.name || '')
				setInputDisabled(false)
				return
			}
			saveNewBoardName()
		} catch (e) {
			toast.error(getErrorMessageForTheUser(e))
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newBoardName = e.target.value
		if (isThisBoardNameWithinTheLimitOfLetters(newBoardName)) {
			setBoardName(newBoardName)
		}
	}

	const handleSaveShortcut = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			saveNewBoardName()
		}
	}

	const { t } = useTranslation()
	return (
		<SettingSection>
			<SettingSection.Title>
				{t('settings.board.change_board_name_section_title')}
			</SettingSection.Title>
			<SettingSection.Content className={`flex items-end `}>
				<div className='grid mr-2 w-full max-w-sm items-center gap-1.5'>
					<Label htmlFor='board-name' className={color.taskText || 'text-black'}>
						{t('settings.board.change_board_name_input_label')}
					</Label>
					<Input
						type='text'
						id='board-name'
						value={nameToShow}
						onChange={handleChange}
						onKeyDown={handleSaveShortcut}
						disabled={inputDisabled}
						placeholder={t('settings.board.change_board_name_input_placeholder')}
					/>
				</div>
				<Button
					onClick={handleClick}
					variant='ghost'
					data-testid='BotonParaCambiarElNombreDelTablero'
				>
					<PencilIcon />
				</Button>
			</SettingSection.Content>
		</SettingSection>
	)
}
