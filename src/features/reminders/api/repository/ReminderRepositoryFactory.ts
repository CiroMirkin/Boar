import { Reminder } from '../../model/reminder'
import LocalStorageReminderRepository from './LocalStorageReminder'
import NextjsReminderRepository from './nextjsReminderRepository'
import type { SessionType } from '@/features/auth'
import { ReminderRepository } from './ReminderRepository'

const getReminderRepository = (session: SessionType): ReminderRepository => {
	if (session) {
		return new NextjsReminderRepository()
	}
	return new LocalStorageReminderRepository()
}

export const fetchReminder = async (session: SessionType, boardId: string): Promise<Reminder> => {
	const repository = getReminderRepository(session)
	return repository.getAll(boardId)
}

export const saveReminder = async ({
	reminder,
	session,
	boardId,
}: {
	reminder: Reminder
	session: SessionType
	boardId: string
}): Promise<void> => {
	const repository = getReminderRepository(session)
	await repository.save(reminder, boardId)
}
