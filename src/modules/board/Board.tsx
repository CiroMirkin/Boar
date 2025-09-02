import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useDocumentTitle, useSessionStorage } from '@uidotdev/usehooks'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { useSaveBoard } from './state/useSaveBoard'
import { LoadingBoard } from './components/LoadingBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useSessionStorage('boar-loading', true)
	const data = useBoard()
	useDocumentTitle(data.name + ' - Boar')

	const { session } = useSession()
	useSaveBoard({ data, session })
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!!session && loading) {
				setLoading(false)
			}
		}, 1000)
		return () => clearTimeout(timer)
	}, [data, session, loading, setLoading])

	if (!!session && loading) {
		return <LoadingBoard />
	}

	return (
		<>
			<div>{children}</div>
			<WelcomeDialog />
		</>
	)
}
