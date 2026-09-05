'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
	const { t } = useTranslation()
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
					<DialogTitle>{t('welcome_dialog.title')}</DialogTitle>
				</DialogHeader>
				<DescriptionOfCapo />
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='default'>
							{t('welcome_dialog.start')}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
