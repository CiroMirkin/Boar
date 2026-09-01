'use client'

import { useEffect, useState } from 'react'

export function useVisibilityChange(): boolean {
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const handler = () => setVisible(document.visibilityState === 'visible')
		handler()
		document.addEventListener('visibilitychange', handler)
		return () => document.removeEventListener('visibilitychange', handler)
	}, [])

	return visible
}
