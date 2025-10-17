'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * Componente para mostrar contenido de texto enriquecido (HTML) en modo de solo lectura.
 * Mantiene el mismo estilo visual que el RichTextEditor pero sin funcionalidad de edición.
 * Convierte automáticamente URLs en texto plano a enlaces clickeables.
 * Ideal para mostrar contenido ya formateado sin permitir modificaciones.
 */
interface RichTextViewerProps {
	/** Contenido HTML a mostrar */
	value?: string
	/** Clases CSS adicionales para personalizar el estilo */
	className?: string
	/** Si debe mostrar el borde del contenedor */
	showBorder?: boolean
}

export default function RichTextViewer({
	value = '',
	className,
	showBorder = true,
}: RichTextViewerProps) {
	/** Referencia al contenedor del contenido */
	const viewerRef = useRef<HTMLDivElement | null>(null)

	/**
	 * Función para convertir URLs en texto a enlaces clickeables
	 */
	const convertUrlsToLinks = (text: string): string => {
		// Regex para detectar URLs (http, https, www, o dominios sin protocolo)
		const urlRegex =
			/(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+[^\s<>"]*)/gi

		return text.replace(urlRegex, (url) => {
			// Añadir protocolo si no lo tiene
			const href = url.startsWith('http') ? url : `https://${url}`
			return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-200">${url}</a>`
		})
	}

	/**
	 * Función para procesar el contenido HTML y convertir URLs en texto plano
	 */
	const processHtmlContent = (html: string): string => {
		// Crear un elemento temporal para procesar el HTML
		const tempDiv = document.createElement('div')
		tempDiv.innerHTML = html

		// Función recursiva para procesar nodos de texto
		const processTextNodes = (node: Node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				// Si es un nodo de texto, convertir URLs
				const textContent = node.textContent || ''
				if (
					textContent.match(
						/(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+[^\s<>"]*)/gi
					)
				) {
					const convertedHtml = convertUrlsToLinks(textContent)
					const wrapper = document.createElement('span')
					wrapper.innerHTML = convertedHtml

					// Reemplazar el nodo de texto con los nuevos nodos
					const parent = node.parentNode
					if (parent) {
						while (wrapper.firstChild) {
							parent.insertBefore(wrapper.firstChild, node)
						}
						parent.removeChild(node)
					}
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				// Si es un elemento, procesar sus hijos solo si no es un enlace
				const element = node as Element
				if (element.tagName.toLowerCase() !== 'a') {
					// Crear una copia de los nodos hijos para evitar problemas con la modificación en vivo
					const childNodes = Array.from(node.childNodes)
					childNodes.forEach((child) => processTextNodes(child))
				}
			}
		}

		// Procesar todos los nodos
		Array.from(tempDiv.childNodes).forEach((child) => processTextNodes(child))

		return tempDiv.innerHTML
	}

	/**
	 * Efecto que sincroniza el contenido del visor y convierte URLs
	 */
	useEffect(() => {
		const viewer = viewerRef.current
		if (!viewer) return

		// Procesar el contenido para convertir URLs
		const processedContent = processHtmlContent(value)

		// Sincronizar contenido si es distinto
		if (processedContent !== viewer.innerHTML) {
			viewer.innerHTML = processedContent
		}
	}, [value])

	return (
		<div
			className={cn(
				'w-full mx-auto bg-background shadow-sm  rounded-lg',
				showBorder && 'border border-gray-300 dark:border-gray-700',
				className
			)}
		>
			{/* Contenedor del contenido (solo lectura) */}
			<div
				ref={viewerRef}
				className={cn(
					'p-4 prose prose-sm max-w-none text-base font-medium',
					'[&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6',
					'[&_li]:marker:text-foreground',
					'select-text', // Permite seleccionar texto
					'cursor-text' // Cursor de texto para indicar que es contenido legible
				)}
				style={{
					wordBreak: 'break-word',
					overflowWrap: 'break-word',
				}}
			/>
		</div>
	)
}
