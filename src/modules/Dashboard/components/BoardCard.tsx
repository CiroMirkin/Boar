import { useTheme } from '@/common/hooks/useTheme'
import { Button } from '@/ui/atoms/button'
import { TrashIcon } from '@/ui/atoms/icons'
import { useMemo } from 'react'
import { TransitionLink } from '@/ui/atoms/TransitionLink'
import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { toast } from 'sonner'

interface Board {
	name: string
	id: string
}

function BoardCard({ board }: { board: Board }) {
	const color = useTheme()
	const hero = useMemo(RandomHero, [])

	const { deleteBoard } = useDashboardQuery()
	const handleDeleteBoard = () => {
		toast.warning('¿Deseas eliminar este tablero? Esta acción no se podrá deshacer.', {
			action: {
				label: 'Eliminar',
				onClick: () => {
					deleteBoard(board.id)
					toast.success('¡El tablero se elimino exitosamente!')
				},
			},
		})
	}

	const boardUrl = `/board/${board.id}`

	return (
		<li
			className={`w-[18rem] flex flex-col rounded-md shadow-lg hover:shadow-xl transition-all ease-in group`}
		>
			<div className={`h-28 w-full ${color.column} rounded-t-md`}>
				<TransitionLink to={boardUrl} title={`Abrir tablero ${board.name}`}>
					{hero}
				</TransitionLink>
			</div>
			<div className={`text-left ${color.task} rounded-b-md`}>
				<div className='flex justify-between items-center pr-3'>
					<TransitionLink to={boardUrl} title={`Abrir tablero ${board.name}`}>
						<h2 className='w-[12rem] py-4 pl-4 text-base font-semibold rounded-b-md hover:underline'>
							{board.name}
						</h2>
					</TransitionLink>
					<Button
						className='py-1 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
						variant='destructiveGhost'
						title='Eliminar tablero'
						onClick={handleDeleteBoard}
					>
						<TrashIcon />
					</Button>
				</div>
			</div>
		</li>
	)
}

export default BoardCard

function RandomHero() {
	const heros = [
		<div className='h-full w-full bg-transparent relative text-gray-800'>
			<div
				className='absolute inset-0 z-0 pointer-events-none'
				style={{
					backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
				}}
			/>
		</div>,
		<div className='h-full w-full bg-transparent relative text-gray-900'>
			<div
				className='absolute inset-0 z-0 pointer-events-none'
				style={{
					backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
					backgroundSize: '30px 30px',
				}}
			/>
		</div>,
		<div className='h-full w-full bg-transparent relative text-gray-900'>
			<div
				className='absolute inset-0 z-0 pointer-events-none'
				style={{
					backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
					backgroundSize: '40px 40px',
				}}
			/>
		</div>,
		<div className='h-full w-full bg-transparent relative text-gray-800'>
			<div
				className='absolute inset-0 z-0 pointer-events-none'
				style={{
					backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(75, 85, 99, 0.06) 5px, rgba(75, 85, 99, 0.06) 6px, transparent 6px, transparent 15px),
        repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px),
        repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 114, 128, 0.04) 10px, rgba(107, 114, 128, 0.04) 11px, transparent 11px, transparent 30px)
      `,
				}}
			/>
		</div>,
	]
	const rnd = Math.random()
	const item = Math.floor(rnd * heros.length)

	return heros[item]
}
