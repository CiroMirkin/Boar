import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery' // Importar el nuevo hook
import { useDocumentTitle } from '@uidotdev/usehooks'
import { LoadingBoard } from './components/LoadingBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const { board, isLoading, isError } = useBoardQuery()
	useDocumentTitle(board ? `${board.name} - Boar` : 'Boar')

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
