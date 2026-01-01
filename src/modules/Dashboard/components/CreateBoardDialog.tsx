import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { PlusIcon } from '@/ui/atoms/icons'
import { Button } from '@/ui/atoms/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/molecules/dialog'
import { Label } from '@/ui/atoms/label'
import { Input } from '@/ui/atoms/input'
import { useState } from 'react'
import { useTheme } from '@/common/hooks/useTheme'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

interface CreateBoardDialogProps {
	hasNoBoards?: boolean
}

function CreateBoardDialog({ hasNoBoards = false }: CreateBoardDialogProps) {
	const { t } = useTranslation()
	const colors = useTheme()
	const { createAnEmptyBoard } = useDashboardQuery()
	const [dialogState, setDialogState] = useState({
		isOpen: false,
		boardName: '',
	})

	const handleCreateBoard = (e: React.FormEvent) => {
		e.preventDefault()

		const promise = createAnEmptyBoard(dialogState.boardName)
		toast.promise(promise, {
			loading: t('dashboard.creating_board'),
			success: () => {
				setDialogState({ isOpen: false, boardName: '' })
				return t('dashboard.create_success')
			},
			error: (error) => error.message || t('dashboard.create_error'),
		})
	}

	const hadnleOpenChange = (open: boolean) => {
		const boardName = open ? '' : dialogState.boardName
		setDialogState({ isOpen: open, boardName })
	}

	return (
		<Dialog open={dialogState.isOpen} onOpenChange={hadnleOpenChange}>
			<DialogTrigger asChild>
				<Button variant='secondary' className='flex items-center'>
					<PlusIcon className='mr-2' />{' '}
					{hasNoBoards ? t('dashboard.create_first_board') : t('dashboard.create_board')}
				</Button>
			</DialogTrigger>
			<DialogContent className={`sm:max-w-md ${colors.column} ${colors.columnText}`}>
				<DialogHeader>
					<DialogTitle>{t('dashboard.new_board_title')}</DialogTitle>
					<DialogDescription>{t('dashboard.new_board_description')}</DialogDescription>
				</DialogHeader>
				<div>
					<form
						className={`grid mr-2 w-full items-center gap-1.5`}
						onSubmit={handleCreateBoard}
					>
						<Label
							className={`${colors.taskText || 'text-black'} ${colors.columnText}`}
						>
							{t('dashboard.name_label')}
						</Label>
						<Input
							type='text'
							placeholder={t('dashboard.name_placeholder')}
							value={dialogState.boardName}
							onChange={(e) =>
								setDialogState({ ...dialogState, boardName: e.target.value })
							}
							autoFocus
						/>
					</form>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='default' onClick={handleCreateBoard}>
							{t('dashboard.create_board')}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateBoardDialog
