import type { SessionType } from '@/auth/contexts/SessionProvider'
import { AvailableTags, TagGroup } from '../model/tags'
import LocalStorageTagRepository from './localstorageTagRepository'
import NextjsTagRepository from './nextjsTagRepository'
import { TagRepository, TagRepositoryGetReturn } from './tagRepository'

const getTagRepository = (session: SessionType): TagRepository => {
	if (session) {
		return new NextjsTagRepository()
	}
	return new LocalStorageTagRepository()
}

export const fetchTags = async (
	session: SessionType,
	boardId: string
): Promise<TagRepositoryGetReturn> => {
	const repository = getTagRepository(session)
	return repository.get(boardId)
}

export const saveTags = async ({
	tags,
	actualTags,
	session,
	boardId,
}: {
	tags: AvailableTags
	actualTags: TagGroup
	session: SessionType
	boardId: string
}): Promise<void> => {
	console.log(boardId)
	console.log(actualTags)

	const repository = getTagRepository(session)
	await repository.save({
		actualTagGroup: actualTags,
		tags,
		boardId,
	})
}
