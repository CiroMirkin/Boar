import { Input } from '@/ui/atoms/input'
import { ChangeEvent, useState } from 'react'
import { Button } from '@/ui/atoms/button'
import { PencilIcon } from '@/ui/atoms/icons'
import { Label } from '@/ui/atoms/label'
import { isThisBoardNameWithinTheLimitOfLetters } from '@/modules/board/models/board'
import { changeBoardName } from '@/modules/board/useCase/changeBoardName'
import getErrorMessageForTheUser from '@/commond/utils/getErrorMessageForTheUser'
import { toast } from 'sonner'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/ui/organisms/SettingSection'
import { useTheme } from '@/commond/hooks/useTheme'

export function ChangeBoardName() {
	const { board, updateBoard } = useBoardQuery()
	const color = useTheme()

	const [boardName, setBoardName] = useState(board?.name || '')
	const [inputDisabled, setInputDisabled] = useState(true)

	const nameToShow = inputDisabled ? board?.name || '' : boardName

	const handleClick = () => {
		try {
			if (inputDisabled) {
				setBoardName(board?.name || '')
				setInputDisabled(false)
			} else if (board) {
				const updatedBoard = changeBoardName({ board, newName: boardName })
				updateBoard(updatedBoard)
				setInputDisabled(true)
			}
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
						disabled={inputDisabled}
						placeholder={t('settings.board.change_board_name_input_placeholder')}
					/>
				</div>
				<Button onClick={handleClick} variant='ghost'>
					<PencilIcon />
				</Button>
			</SettingSection.Content>
		</SettingSection>
	)
}
