'use client'

import { useEffect } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/molecules/dialog'
import { Button } from '@/shared/ui/atoms/button'
import { DescriptionOfCapo } from '@/shared/ui/atoms/DescriptionOfCapo'

export function WelcomeDialog() {
	// clave 'boar-welcome-dialog' (nombre anterior del proyecto): no renombrar para no invalidar el localStorage de usuarios existentes
	const open = localStorage.getItem('boar-welcome-dialog')
		? JSON.parse(localStorage.getItem('boar-welcome-dialog') as string)
		: false
	useEffect(() => {
		open == false && localStorage.setItem('boar-welcome-dialog', 'true')
	}, [open])

	return (
		<Dialog defaultOpen={open === false && true}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>¡Bienvenido!</DialogTitle>
				</DialogHeader>
				<DescriptionOfCapo />
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='default'>
							Empezar
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
