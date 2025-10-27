import { useCallback } from 'react'
import { toast } from 'sonner'

interface UseExportJsonOptions {
	filename?: string
	indent?: number
}

export const useExportJson = <T,>(options: UseExportJsonOptions = {}) => {
	const { filename = 'data.json', indent = 2 } = options

	const exportJson = useCallback(
		(data: T) => {
			try {
				const jsonString = JSON.stringify(data, null, indent)
				const blob = new Blob([jsonString], { type: 'application/json' })

				const url = URL.createObjectURL(blob)
				const link = document.createElement('a')
				link.href = url
				link.download = filename
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				URL.revokeObjectURL(url)

				return true
			} catch (error) {
				toast.error('Error inesperado al exportar el archivo :(')
				console.error('Error al exportar el archivo:', error)
				return false
			}
		},
		[filename, indent]
	)

	return { exportJson }
}
