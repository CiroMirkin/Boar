import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useSession } from '@/SessionProvider'
import { useEffect, useState } from 'react'
import { useSaveBoard } from './state/useSaveBoard'
import { LoadingBoard } from './components/LoadingBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const [ loading, setLoading ] = useState(true)
	const data = useBoard()
	useDocumentTitle(data.name + " - Boar")

	const { session } = useSession()
	useEffect(() => {
		if(!!session) {
			setLoading(false)
		}
		useSaveBoard({ data, session })
	}, [data])
	
	if(!!session && loading) {
		return <LoadingBoard/>
	}

	return (
		<>
			<div>
				{children}
			</div>
			<WelcomeDialog />
		</>
	)
}
