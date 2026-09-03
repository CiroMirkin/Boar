'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/atoms/button'
import { TrashIcon } from '@/shared/ui/atoms/icons'
import { Input } from '@/shared/ui/atoms/input'
import { Label } from '@/shared/ui/atoms/label'
import { SettingSection } from '@/shared/ui/organisms/SettingSection'
import { useTheme } from '@/shared/hooks/useTheme'
import { useBoardQuery } from '../hooks/useBoardQuery'
import { useDashboardQuery } from '@/features/dashboard/hooks/useDashboardQuery'

interface Props {
	id: string
}

export function DeleteBoard({ id }: Props) {
	const { t } = useTranslation()
	const color = useTheme()
	const router = useRouter()
	const { board } = useBoardQuery(id)
	const { deleteBoard } = useDashboardQuery()

	const [confirmed, setConfirmed] = useState(false)
	const [typedName, setTypedName] = useState('')

	const canDelete = confirmed && !!board?.name && typedName.trim() === board.name

	const handleDeleteBoard = () => {
		toast.warning(t('dashboard.delete_warning'), {
			action: {
				label: t('dashboard.delete_button'),
				onClick: () => {
					const promise = deleteBoard(id).then(() => router.push('/'))
					toast.promise(promise, {
						loading: t('dashboard.deleting_board'),
						success: () => t('dashboard.delete_success'),
						error: (e) => e.message || t('dashboard.delete_error'),
					})
				},
			},
		})
	}

	return (
		<SettingSection>
			<SettingSection.Title>
				{t('settings.board.delete_board_section_title')}
			</SettingSection.Title>
			<SettingSection.Description>
				{t('settings.board.delete_board_section_description')}
			</SettingSection.Description>
			<SettingSection.Content className='flex flex-col gap-4'>
				<label className='flex items-center gap-3 cursor-pointer'>
					<input
						type='checkbox'
						checked={confirmed}
						onChange={(e) => setConfirmed(e.target.checked)}
						className='w-4 h-4 accent-black bg-gray-100 border-gray-300 rounded focus:ring-2'
					/>
					<span>{t('settings.board.delete_board_confirm_checkbox')}</span>
				</label>
				<div className='grid w-full max-w-sm items-center gap-1.5'>
					<Label htmlFor='delete-board-name' className={color.taskText || 'text-black'}>
						{t('settings.board.delete_board_name_input_label')}{' '}
						{board?.name && <span className='opacity-50'>({board.name})</span>}
					</Label>
					<Input
						type='text'
						id='delete-board-name'
						value={typedName}
						onChange={(e) => setTypedName(e.target.value)}
						placeholder={t('settings.board.delete_board_name_input_placeholder')}
					/>
				</div>
				<Button
					variant='destructive'
					disabled={!canDelete}
					onClick={handleDeleteBoard}
					className='w-fit flex items-center gap-2'
					data-testid='BotonParaEliminarElTablero'
				>
					<TrashIcon />
					{t('settings.board.delete_board_button')}
				</Button>
			</SettingSection.Content>
		</SettingSection>
	)
}
