import { useTheme } from '@/shared/hooks/useTheme'
import { Header } from '@/shared/ui/organisms/Header'
import { USER_IS_IN } from '@/shared/ui/organisms/userIsIn'
import { ReactNode } from 'react'

interface PageContainerProps {
	children: ReactNode
	whereUserIs: USER_IS_IN
	title?: string
	className?: string
	showBoardNavigation?: boolean
}

export default function PageContainer({
	children,
	whereUserIs,
	title = 'Capo',
	className = '',
	showBoardNavigation = true,
}: PageContainerProps) {
	const { bg, text } = useTheme()
	return (
		<div className={`${bg} ${text}`}>
			<Header
				title={title}
				whereUserIs={whereUserIs}
				showBoardNavigation={showBoardNavigation}
			/>
			<main className={`w-full min-h-[calc(100vh-5rem)] ${className}`}>{children}</main>
		</div>
	)
}
