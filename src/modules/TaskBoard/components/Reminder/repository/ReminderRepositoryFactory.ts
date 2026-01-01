import { Reminder } from '../model/reminder'
import LocalStorageReminderRepository from './LocalStorageReminder'
import SupabaseReminderRepository from './SupabaseReminderRepository'
import { Session } from '@supabase/supabase-js'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { ReminderRepository } from './ReminderRepository'

const getReminderRepository = (session: Session | null): ReminderRepository => {
	if (session) {
		return new SupabaseReminderRepository()
	}
	return new LocalStorageReminderRepository()
}

export const fetchReminder = async (session: Session | null): Promise<Reminder> => {
	const repository = getReminderRepository(session)
	const boardId = getActualBoardId()
	return repository.getAll(boardId)
}

export const saveReminder = async ({
	reminder,
	session,
}: {
	reminder: Reminder
	session: Session | null
}): Promise<void> => {
	const repository = getReminderRepository(session)
	const boardId = getActualBoardId()
	await repository.save(reminder, boardId)
}
