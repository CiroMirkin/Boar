'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui/atoms/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='w-full p-20'>
			<p>Lo sentimos. Hubo un error inesperado. &#x1F641;</p>
			<div className='flex items-center gap-2'>
				<Button onClick={reset}>Reintentar</Button>
				<a href='https://github.com/CiroMirkin/Boar/issues' target='_blank' rel='noreferrer'>
					<Button variant='link' className='pl-0'>
						Reportar en GitHub
					</Button>
				</a>
			</div>
		</div>
	)
}
