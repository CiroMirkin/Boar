'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/atoms/button'
import { TrashIcon } from '@/shared/ui/atoms/icons'
import { SettingSection } from '@/shared/ui/organisms/SettingSection'

/** Claves de localStorage que contienen el contenido del tablero invitado. */
const GUEST_BOARD_KEYS = [
	'board-capo',
	'taskListInEachColumn',
	'tasks-archive',
	'tags-capo',
	'capo-reminder',
	'capo-notes',
	'capo-archived-notes',
	'capo-usage-history',
]

/**
 * Reemplazo de `DeleteBoard` para el modo invitado.
 */
export function ResetBoard() {
	const { t } = useTranslation()

	const [confirmed, setConfirmed] = useState(false)

	const handleResetBoard = () => {
		toast.warning(t('settings.board.reset_board_confirm_toast'), {
			action: {
				label: t('settings.board.reset_board_button'),
				onClick: () => {
					GUEST_BOARD_KEYS.forEach((key) => localStorage.removeItem(key))
					toast.success(t('settings.board.reset_board_success'))
					window.location.assign('/')
				},
			},
		})
	}

	return (
		<SettingSection>
			<SettingSection.Title>
				{t('settings.board.reset_board_section_title')}
			</SettingSection.Title>
			<SettingSection.Description>
				{t('settings.board.reset_board_section_description')}
			</SettingSection.Description>
			<SettingSection.Content className='flex flex-col gap-4'>
				<label className='flex items-center gap-3 cursor-pointer'>
					<input
						type='checkbox'
						checked={confirmed}
						onChange={(e) => setConfirmed(e.target.checked)}
						className='w-4 h-4 accent-black bg-gray-100 border-gray-300 rounded focus:ring-2'
					/>
					<span>{t('settings.board.reset_board_confirm_checkbox')}</span>
				</label>
				<Button
					variant='destructive'
					disabled={!confirmed}
					onClick={handleResetBoard}
					className='w-fit flex items-center gap-2'
					data-testid='BotonParaResetearElTablero'
				>
					<TrashIcon />
					{t('settings.board.reset_board_button')}
				</Button>
			</SettingSection.Content>
		</SettingSection>
	)
}
