import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { checkIfUserHasTheDefaultBoard } from '../model/checkIfUserHasTheDefaultBoard'

export function useDefaultBoardCheck() {
	const { t } = useTranslation()
	const showToast = useRef<boolean>(false)

	useEffect(() => {
		const checkDefaultBoard = async () => {
			if (showToast.current) return
			showToast.current = true

			try {
				const hasUserDefaultBoard = await checkIfUserHasTheDefaultBoard()
				if (!hasUserDefaultBoard) {
					toast.warning(
						t('board_will_be_lost_warning', {
							defaultValue: 'El tablero actual se perderá si inicia sesión.',
						})
					)
				}
			} catch (error) {
				console.error('Error checking default board:', error)
			}
		}

		checkDefaultBoard()
	}, [t])

	return null
}
