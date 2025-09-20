import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useSession } from '@/auth/hooks/useSession'
import { useSaveBoard } from './state/useSaveBoard'
import { LoadingBoard } from './components/LoadingBoard'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export function Board({ children }: { children: React.ReactNode }) {
	const isLoading = useSelector((state: RootState) => state.board.isLoading)
	const data = useBoard()
	useDocumentTitle(data.name + ' - Boar')

	const { session } = useSession()
	useSaveBoard({ data, session })

	if (isLoading) {
		return <LoadingBoard />
	}

	return (
		<>
			<div>{children}</div>
			<WelcomeDialog />
		</>
	)
}
