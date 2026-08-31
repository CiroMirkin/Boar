import type { SessionType } from '@/auth/contexts/SessionProvider'
import { ArchiveRepository } from './archiveRepository'
import NextjsArchiveRepository from './nextjsArchiveRepository'
import LocalStorageArchiveRepository from './localStorageArchive'
import { Archive } from '../models/archive'

const getArchivedTasksRepository = (session: SessionType): ArchiveRepository => {
	if (session) {
		return new NextjsArchiveRepository()
	}
	return new LocalStorageArchiveRepository()
}

export const fetchArchivedTasks = async (
	session: SessionType,
	boardId: string
): Promise<Archive> => {
	const repository = getArchivedTasksRepository(session)
	return repository.getAll(boardId)
}

export const saveArchivedTasks = async ({
	session,
	archivedTasks,
	boardId,
}: {
	session: SessionType
	archivedTasks: Archive
	boardId: string
}): Promise<void> => {
	const repository = getArchivedTasksRepository(session)
	await repository.save(archivedTasks, boardId)
}
