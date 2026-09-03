'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useSession } from '@/features/auth'
import { useBoardQuery } from '@/features/boards'
import { SettingSection } from '@/shared/ui/organisms/SettingSection'
import { CheckIcon } from '@/shared/ui/atoms/icons'
import { heros } from './heros'

interface Props {
	boardId: string
}

export function CanvasSelection({ boardId }: Props) {
	const { t } = useTranslation()
	const { board } = useBoardQuery(boardId)
	const { session } = useSession()
	const queryClient = useQueryClient()
	const boardKey = ['board', session?.user.id, boardId]

	const current = board?.cardCanvas ?? 0

	const { mutate } = useMutation({
		mutationFn: async (index: number) => {
			const { setBoardCardCanvas } = await import('../api/actions/setBoardCardCanvas')
			await setBoardCardCanvas({ boardId, index })
		},
		onMutate: async (index: number) => {
			await queryClient.cancelQueries({ queryKey: boardKey })
			const previous = queryClient.getQueryData(boardKey)
			queryClient.setQueryData(boardKey, (old: Record<string, unknown> | undefined) =>
				old ? { ...old, cardCanvas: index } : old
			)
			return { previous }
		},
		onError: (_e, _i, ctx) => queryClient.setQueryData(boardKey, ctx?.previous),
		onSettled: () => queryClient.invalidateQueries({ queryKey: boardKey }),
	})

	// Los invitados no tienen tablero en la DB ni board cards; el canvas no aplica.
	if (!session) return null

	const pick = (index: number) => {
		mutate(index)
		toast.success(t('settings.board.set_card_canvas_toast'))
	}

	return (
		<SettingSection>
			<SettingSection.Title>
				{t('settings.board.card_canvas_section_title')}
			</SettingSection.Title>
			<SettingSection.Description>
				{t('settings.board.card_canvas_section_description')}
			</SettingSection.Description>
			<SettingSection.Content className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
				{heros.map((hero, index) => (
					<button
						key={index}
						type='button'
						onClick={() => pick(index)}
						className={`relative h-20 cursor-default rounded-md bg-white/70 overflow-hidden border-2 ${current === index ? 'border-black' : 'border-transparent'}`}
					>
						{hero}
						{current === index && (
							<span className='absolute inset-0 grid place-items-center'>
								<CheckIcon className='p-0' />
							</span>
						)}
					</button>
				))}
			</SettingSection.Content>
		</SettingSection>
	)
}
