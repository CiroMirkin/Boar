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
	const open = localStorage.getItem('capo-welcome-dialog')
		? JSON.parse(localStorage.getItem('capo-welcome-dialog') as string)
		: false
	useEffect(() => {
		open == false && localStorage.setItem('capo-welcome-dialog', 'true')
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
