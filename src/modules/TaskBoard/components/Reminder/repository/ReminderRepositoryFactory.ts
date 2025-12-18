import { Reminder } from '../model/reminder'
import LocalStorageReminderRepository from './LocalStorageReminder'
import SupabaseReminderRepository from './SupabaseReminderRepository'
import { Session } from '@supabase/supabase-js'

// Permite obtener el repositorio correcto segun el estado del usuario
const getReminderRepository = (session: Session | null) => {
	if (session) {
		return new SupabaseReminderRepository()
	}
	return new LocalStorageReminderRepository()
}

export const fetchReminder = async (session: Session | null): Promise<Reminder> => {
	const repository = getReminderRepository(session)
	return repository.getAll()
}

export const saveReminder = async ({
	reminder,
	session,
}: {
	reminder: Reminder
	session: Session | null
}): Promise<void> => {
	const repository = getReminderRepository(session)
	await repository.save(reminder)
}
