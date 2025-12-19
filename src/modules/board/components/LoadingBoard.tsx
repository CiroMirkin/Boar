import { useTheme } from '@/common/hooks/useTheme'
import { Spinner } from '@/ui/atoms/spinner'

export function LoadingBoard() {
	const { column } = useTheme()
	return (
		<div className='w-full h-80 px-6 md:px-11 flex flex-col items-center justify-center'>
			<div className={`flex items-center p-3 rounded-lg ${column}`}>
				<Spinner size={30} />
				<p className='block p-3 text-lg'>Cargando contenido del tablero...</p>
			</div>
		</div>
	)
}
