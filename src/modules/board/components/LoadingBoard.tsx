import { useTheme } from "@/App"

export function LoadingBoard() {
    const { column } = useTheme()
    return (
        <div className='w-full h-80 px-6 md:px-11 flex flex-col items-center justify-center'>
			<div className={`p-3 rounded-lg ${column}`}>
			    <p className='block p-3 text-lg'>Cargando contenido del tablero...</p>
			</div>
		</div>
    )
}