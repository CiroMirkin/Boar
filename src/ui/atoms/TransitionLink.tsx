import { useCallback } from 'react'
import { Link, LinkProps, useNavigate } from 'react-router-dom'

interface TransitionLinkProps extends Omit<LinkProps, 'to'> {
	to: string
}
const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document

export function TransitionLink({ to, onClick, children, ...props }: TransitionLinkProps) {
	const navigate = useNavigate()

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
				return
			}

			e.preventDefault()
			onClick?.(e)

			if (supportsViewTransitions) {
				document.startViewTransition(() => navigate(to))
			} else {
				navigate(to)
			}
		},
		[to, navigate, onClick]
	)

	return (
		<Link to={to} onClick={handleClick} {...props}>
			{children}
		</Link>
	)
}
