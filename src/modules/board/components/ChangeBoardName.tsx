import { Input } from '@/ui/atoms/input'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@/ui/atoms/button'
import { useDispatch } from 'react-redux'
import { changeTheNameOfTheBoard } from '@/modules/board/state/boardReducer'
import { PencilIcon } from '@/ui/atoms/icons'
import { Label } from '@/ui/atoms/label'
import {
	isThisBoardNameValid,
	isThisBoardNameWithinTheLimitOfLetters,
} from '@/modules/board/models/board'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { toast } from "sonner"
import { useBoard } from '@/modules/board/hooks/useBoard'
import { BoardRepository } from '@/modules/board/models/boardRepository'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { useTranslation } from 'react-i18next'
import { useSession } from '@/SessionProvider'
import { SettingSection } from '@/ui/organisms/SettingSection'

const boardRepository: BoardRepository = new LocalStorageBoardRepository()

export function ChangeBoardName() {
	const boardData = useBoard()

	const { session } = useSession()
	useEffect(() => {
		// Si el usuario no inicio session (!session)
		if(!session) boardRepository.save(boardData)
	}, [boardData])

	const [boardName, setBoardName] = useState(boardData.name)
	const [inputDisabled, setInputDisabled] = useState(true)

	const dispatch = useDispatch()
	const changeName = () => dispatch(changeTheNameOfTheBoard(boardName))

	const handleClick = () => {
		try {
			if (inputDisabled) {
				setInputDisabled(false)
			} else if (isThisBoardNameValid(boardName)) {
				changeName()
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
			<SettingSection.Title>{t('settings.board.change_board_name_section_title')}</SettingSection.Title>
			<SettingSection.Content className={`flex items-end `}>
				<div className='grid mr-2 w-full max-w-sm items-center gap-1.5'>
					<Label htmlFor='board-name'>
						{t('settings.board.change_board_name_input_label')}
					</Label>
					<Input
						type='text'
						id='board-name'
						value={boardName}
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
