import { useTheme } from '@/common/hooks/useTheme'
import { Button } from '@/ui/atoms/button'
import { ClockIcon } from '@/ui/atoms/icons'
import { RefreshCw } from 'lucide-react'
import { useMemo } from 'react'
import { TransitionLink } from '@/ui/atoms/TransitionLink'

interface Board {
	name: string
	id: string
}

function BoardCard({ board }: { board: Board }) {
	const color = useTheme()
	const hero = useMemo(RandomHero, [])

	return (
		<li
			className={`w-[18rem] flex flex-col rounded-md shadow-lg hover:shadow-xl transition-all ease-in`}
		>
			<div className={`h-28 w-full ${color.column} rounded-t-md`}>{hero}</div>
			<div className={`text-left p-3 pt-2 ${color.task} rounded-b-md`}>
				<TransitionLink to={`/board/${board.id}`}>
					<header className='py-2 flex justify-between items-center hover:underline'>
						<h2 className='pl-1 text-base font-semibold'>{board.name}</h2>
					</header>
				</TransitionLink>

				<div className='my-2 flex items-center justify-around rounded-lg bg-background/20 p-2'>
					<div className='flex flex-1 flex-col items-center justify-center text-center'>
						<div className='flex items-center gap-1'>
							<ClockIcon className='h-4 w-4 opacity-60' />
							<span className='text-sm font-semibold text-card-foreground'>5</span>
						</div>
						<span className='text-xs capitalize opacity-60'>Pendientes</span>
					</div>
					<div className='h-10 w-px bg-border' />
					<div className='flex flex-1 flex-col items-center justify-center text-center'>
						<div className='flex items-center gap-1'>
							<RefreshCw className='h-4 w-4 opacity-60' />
							<span className='text-sm font-semibold text-card-foreground'>2</span>
						</div>
						<span className='text-xs capitalize opacity-60'>Realizando</span>
					</div>
				</div>
				<footer className='flex flex-col gap-2'>
					<TransitionLink to={`/board/${board.id}`}>
						<Button variant='secondary' className={`w-full hover:underline`}>
							Ver tablero
						</Button>
					</TransitionLink>
				</footer>
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
