import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { PlusCircle } from 'lucide-react'
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

function CreateBoardDialog() {
	const colors = useTheme()
	const { createAnEmptyBoard } = useDashboardQuery()
	const [newBoardName, setNewBoardName] = useState('')

	const handleCreateBoard = () => {
		createAnEmptyBoard(newBoardName, {
			onSuccess: () => {
				toast.success('Tablero creado exitosamente')
				setNewBoardName('')
			},
			onError: (error) => {
				toast.error(error.message)
			},
		})
	}

	return (
		<Dialog onOpenChange={(isOpen) => isOpen && setNewBoardName('')}>
			<DialogTrigger asChild>
				<Button variant='secondary' className='flex items-center'>
					<PlusCircle className='mr-2' /> Crear tablero
				</Button>
			</DialogTrigger>
			<DialogContent className={`sm:max-w-md ${colors.column} ${colors.columnText}`}>
				<DialogHeader>
					<DialogTitle>Nuevo tablero</DialogTitle>
					<DialogDescription>
						El nuevo tablero estara vacio, una vez creado podras configurarlo y cambiar
						su nombre si lo deseas.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className={`grid mr-2 w-full items-center gap-1.5`}>
						<Label
							className={`${colors.taskText || 'text-black'} ${colors.columnText}`}
						>
							Nombre:
						</Label>
						<Input
							type='text'
							placeholder='Trabajo...'
							value={newBoardName}
							onChange={(e) => setNewBoardName(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='default' onClick={handleCreateBoard}>
							Crear Tablero
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateBoardDialog
