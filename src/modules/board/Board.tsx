import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { useDocumentTitle } from '@uidotdev/usehooks'

interface Props {
	children: React.ReactNode
	id: string
}

export function Board({ children, id }: Props) {
	const { board, isError } = useBoardQuery(id)
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
