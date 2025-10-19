import { Session } from '@supabase/supabase-js'
import { AvailableTags, TagGroup } from '../model/tags'
import LocalStorageTagRepository from './localstorageTagRepository'
import SupabaseTagRepository from './supabaseTagRepository'
import { TagRepository, TagRepositoryGetReturn } from './tagRepository'

const getTagRepository = (session: Session | null): TagRepository => {
	if (session) {
		return new SupabaseTagRepository()
	}
	return new LocalStorageTagRepository()
}

export const fetchTags = async (session: Session | null): Promise<TagRepositoryGetReturn> => {
	const repository = getTagRepository(session)
	return repository.get()
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
	await repository.save({
		actualTagGroup: actualTags,
		tags,
	})
}
