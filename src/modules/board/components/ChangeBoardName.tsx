import { Input } from '@/ui/input'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@/ui/button'
import { useDispatch } from 'react-redux'
import { changeTheNameOfTheBoard } from '@/modules/board/state/boardReducer'
import { Pencil } from 'lucide-react'
import { iconSize } from '@/sharedByModules/configs/iconsConstants'
import { Label } from '@/ui/label'
import {
	isThisBoardNameValid,
	isThisBoardNameWithinTheLimitOfLetters,
} from '@/modules/board/models/board'
import getErrorMessageForTheUser from '@/sharedByModules/utils/getErrorMessageForTheUser'
import { useToast } from '@/ui/use-toast'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { BoardRepository } from '@/modules/board/models/boardRepository'
import LocalStorageBoardRepository from '@/modules/board/state/localstorageBoard'
import { useTranslation } from 'react-i18next'
import { useSession } from '@/SessionProvider'

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
	const { toast } = useToast()

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
			toast({
				description: getErrorMessageForTheUser(e),
				variant: 'destructive',
				duration: 3000,
			})
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
		<>
			<h2 className='text-2xl'>{t('settings.board.change_board_name_section_title')}</h2>
			<div className='my-5 flex items-end'>
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
					<Pencil size={iconSize} />
				</Button>
			</div>
		</>
	)
}
