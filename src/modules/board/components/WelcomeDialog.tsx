import { useEffect } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog'
import { Button } from '@/ui/button'
import { DescriptionOfBoar } from '../../../shared/components/DescriptionOfBoar'

export function WelcomeDialog() {
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
				<DescriptionOfBoar />
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
