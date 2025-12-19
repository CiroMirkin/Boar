import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { useDocumentTitle } from '@uidotdev/usehooks'

export function Board({ children }: { children: React.ReactNode }) {
	const { board, isError } = useBoardQuery()
	useDocumentTitle(board ? `${board.name} - Boar` : 'Boar')

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
