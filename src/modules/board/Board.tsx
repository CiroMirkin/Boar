import { Header } from '../../sharedByModules/Header/Header'
import { USER_IS_IN } from '../../sharedByModules/Header/userIsIn'
import { WelcomeDialog } from './components/WelcomeDialog'
import { useBoard } from '@/modules/board/hooks/useBoard'
import { useTheme } from '../../sharedByModules/Theme/ThemeContext'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useSession } from '@/SessionProvider'
import { useEffect } from 'react'
import { sendForSaveBoard } from './state/sendForSaveBoard'

export function Board({ children }: { children: React.ReactNode }) {
	const data = useBoard()
	useDocumentTitle(data.name + " - Boar")
	const { bg, text } = useTheme()

	const { session } = useSession()
	useEffect(() => {
		if(!!session) sendForSaveBoard(data)
	}, [])

	return (
		<div className={`${bg} ${text}`}>
			<Header title={data.name} whereUserIs={USER_IS_IN.BOARD} />
			<div className="w-full min-h-[calc(100vh-6rem)]">
				{children}
			</div>
			<WelcomeDialog />
		</div>
	)
}
