import { Session } from '@supabase/supabase-js'
import { ArchiveRepository } from './archiveRepository'
import SupabaseArchivedTasksRepository from './SupabaseArchivedTasksRepository'
import LocalStorageArchiveRepository from './localStorageArchive'
import { Archive } from '../models/archive'

const getArchivedTasksRepository = (session: Session | null): ArchiveRepository => {
	if (session) {
		return new SupabaseArchivedTasksRepository()
	}
	return new LocalStorageArchiveRepository()
}

export const fetchArchivedTasks = async (session: Session | null): Promise<Archive> => {
	const repository = getArchivedTasksRepository(session)
	return repository.getAll()
}

export const saveArchivedTasks = async ({
	session,
	archivedTasks,
}: {
	session: Session | null
	archivedTasks: Archive
}): Promise<void> => {
	const repository = getArchivedTasksRepository(session)
	await repository.save(archivedTasks)
}
