'use client'

import LocalStorageReminderRepository from '../repository/LocalStorageReminder'
import NextjsReminderRepository from '../repository/nextjsReminderRepository'
import { Reminder } from '../model/reminder'
import { useReminderStore } from '../state/store'
import { useSession } from '@/auth/hooks/useSession'
import { useBoardId } from '@/auth/state/store'

type UseSaveReminderReturn = (reminder: Reminder) => void

export const useSaveReminder = (): UseSaveReminderReturn => {
	const { session } = useSession()
	const actualBoardId = useBoardId((state) => state.board_id)

	const saveInRepository = (reminder: Reminder) => {
		if (session && actualBoardId) {
			new NextjsReminderRepository().save(reminder, actualBoardId)
		} else {
			new LocalStorageReminderRepository().save(reminder)
		}
	}

	const setReminder = useReminderStore((store) => store.setReminder)
	return (reminder: Reminder) => {
		setReminder(reminder)
		saveInRepository(reminder)
	}
}
