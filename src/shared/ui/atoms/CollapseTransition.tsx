import { useState, useEffect, useRef, ReactNode } from 'react'

interface CollapseTransitionProps {
	isOpen: boolean
	duration?: number
	children: ReactNode
	className?: string
}

/**
 * Componente reutilizable para transiciones de colapso/expansión, este componente permite eliminar el componente del DOM al estar colapsado.
 * @param isOpen - Controla si el contenido está visible
 * @param duration - Duración de la transición en ms (default: 300)
 * @param children - Contenido a mostrar/ocultar
 * @param className - Clases CSS adicionales para el contenedor
 */
export function CollapseTransition({
	isOpen,
	duration = 300,
	children,
	className = '',
}: CollapseTransitionProps) {
	const [shouldRender, setShouldRender] = useState(isOpen)
	const [isAnimating, setIsAnimating] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		if (isOpen) {
			setShouldRender(true)
			setIsAnimating(true)
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsAnimating(false)
				})
			})
		} else if (shouldRender) {
			setIsAnimating(true)
			timeoutRef.current = setTimeout(() => {
				setShouldRender(false)
				setIsAnimating(false)
			}, duration)
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [isOpen, shouldRender, duration])

	if (!shouldRender) return null

	return (
		<div
			className={`grid transition-all ease-in-out ${
				isOpen && !isAnimating ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
			} ${className}`}
			style={{ transitionDuration: `${duration}ms` }}
		>
			<div className='overflow-hidden min-h-0'>{children}</div>
		</div>
	)
}
