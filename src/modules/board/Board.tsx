import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery' // Importar el nuevo hook
import { useDocumentTitle } from '@uidotdev/usehooks'
import { LoadingBoard } from './components/LoadingBoard'

export function Board({ children }: { children: React.ReactNode }) {
	// Usar el nuevo hook
	const { board, isLoading, isError } = useBoardQuery()

	// useDocumentTitle ahora necesita manejar el caso en que `board` es undefined
	useDocumentTitle(board ? `${board.name} - Boar` : 'Boar')

	// El hook `useSaveBoard` ya no es necesario, la mutación se encarga de guardar.
	// Deberás llamar a `updateBoard(nuevoEstadoDelBoard)` desde donde sea que modifiques el board.

	if (isLoading) {
		return <LoadingBoard />
	}

	if (isError) {
		return <div>Ha ocurrido un error al cargar el tablero.</div>
	}

	return (
		<>
			<div>{children}</div>
			<WelcomeDialog />
		</>
	)
}
