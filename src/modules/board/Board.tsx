import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useSaveBoard } from './state/useSaveBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()
	useDocumentTitle(data.name + " - Boar")

	const { session } = useSession()
	useEffect(() => {
		useSaveBoard({ data, session })
	}, [data])

	return (
		<>
			<div>
				{children}
			</div>
			<WelcomeDialog />
		</>
	)
}
