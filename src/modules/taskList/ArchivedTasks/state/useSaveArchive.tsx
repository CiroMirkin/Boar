import { Archive } from '../models/archive'
import { SessionType } from '@/auth/contexts/SessionProvider'
import SupabaseArchivedTasksRepository from '../repository/SupabaseArchivedTasksRepository'
import LocalStorageArchiveRepository from '../repository/localStorageArchive'

interface useSaveArchiveParams {
	archive: Archive
	session: SessionType
	emptyArchive?: boolean
}

export const useSaveArchive = () => {
	const localStorage = new LocalStorageArchiveRepository()
	const localArchive = localStorage.getAll()

	return ({ archive, session, emptyArchive = false }: useSaveArchiveParams) => {
		if (JSON.stringify(archive) !== JSON.stringify([]) || emptyArchive) {
			const isNotTheLocalArchive = JSON.stringify(archive) !== JSON.stringify(localArchive)
			if (!!session && isNotTheLocalArchive) {
				const supabase = new SupabaseArchivedTasksRepository()
				supabase.save(archive)
			} else {
				localStorage.save(archive)
			}
		}
	}
}
