import { Session } from '@supabase/supabase-js'
import { ArchiveRepository } from './archiveRepository'
import SupabaseArchivedTasksRepository from './SupabaseArchivedTasksRepository'
import LocalStorageArchiveRepository from './localStorageArchive'
import { Archive } from '../models/archive'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const getArchivedTasksRepository = (session: Session | null): ArchiveRepository => {
	if (session) {
		return new SupabaseArchivedTasksRepository()
	}
	return new LocalStorageArchiveRepository()
}

export const fetchArchivedTasks = async (session: Session | null): Promise<Archive> => {
	const repository = getArchivedTasksRepository(session)
	const boardId = getActualBoardId()
	return repository.getAll(boardId)
}

export const saveArchivedTasks = async ({
	session,
	archivedTasks,
}: {
	session: Session | null
	archivedTasks: Archive
}): Promise<void> => {
	const repository = getArchivedTasksRepository(session)
	const boardId = getActualBoardId()
	await repository.save(archivedTasks, boardId)
}
