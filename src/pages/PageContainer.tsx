import { useTheme } from '@/commond/hooks/useTheme'
import { Header } from '@/ui/organisms/Header'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { ReactNode } from 'react'

interface PageContainerProps {
	children: ReactNode
	whereUserIs: USER_IS_IN
	title?: string
	className?: string
}

export default function PageContainer({
	children,
	whereUserIs,
	title = 'Boar',
	className = '',
}: PageContainerProps) {
	const { bg, text } = useTheme()
	return (
		<div className={`${bg} ${text}`}>
			<Header title={title} whereUserIs={whereUserIs} />
			<main className={`w-full min-h-[calc(100vh-5rem)] ${className}`}>{children}</main>
		</div>
	)
}
