import { Session } from '@supabase/supabase-js'
import { AvailableTags, TagGroup } from '../model/tags'
import LocalStorageTagRepository from './localstorageTagRepository'
import SupabaseTagRepository from './supabaseTagRepository'
import { TagRepository, TagRepositoryGetReturn } from './tagRepository'
import { getActualBoardId } from '@/auth/utils/getActualBoardId'

const getTagRepository = (session: Session | null): TagRepository => {
	if (session) {
		return new SupabaseTagRepository()
	}
	return new LocalStorageTagRepository()
}

export const fetchTags = async (session: Session | null): Promise<TagRepositoryGetReturn> => {
	const repository = getTagRepository(session)
	const boardId = getActualBoardId()
	return repository.get(boardId)
}

export const saveTags = async ({
	tags,
	actualTags,
	session,
}: {
	tags: AvailableTags
	actualTags: TagGroup
	session: Session | null
}): Promise<void> => {
	const repository = getTagRepository(session)
	const boardId = getActualBoardId()
	await repository.save({
		actualTagGroup: actualTags,
		tags,
		boardId,
	})
}
