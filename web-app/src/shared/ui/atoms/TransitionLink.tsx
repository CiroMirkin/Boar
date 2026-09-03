'use client'

import { useCallback, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string
	title?: string
}

const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document

export function TransitionLink({ to, onClick, children, title, ...props }: TransitionLinkProps) {
	const router = useRouter()

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
				return
			}

			e.preventDefault()
			onClick?.(e)

			if (supportsViewTransitions) {
				document.startViewTransition(() => router.push(to))
			} else {
				router.push(to)
			}
		},
		[to, router, onClick]
	)

	return (
		<Link href={to} onClick={handleClick} title={title} {...props}>
			{children}
		</Link>
	)
}
