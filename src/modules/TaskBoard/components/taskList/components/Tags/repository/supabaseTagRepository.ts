import { getActualBoardId } from '@/auth/utils/getActualBoardId'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { defaultAvialableTags, emptyTagGroup } from '../model/tags'
import { TagRepository, TagRepositoryGetReturn, TagRepositorySaveParams } from './tagRepository'

export default class SupabaseTagRepository implements TagRepository {
	async save({ actualTagGroup, tags }: TagRepositorySaveParams): Promise<void> {
		if (!isSupabaseConfigured || !supabase) return

		const boardId = getActualBoardId()
		console.info(tags)
		const { error } = await supabase
			.from('board_accessories')
			.update({
				actual_tag_group: actualTagGroup,
			})
			.eq('id', boardId)
		if (error) throw error
	}

	async get(): Promise<TagRepositoryGetReturn> {
		if (!isSupabaseConfigured || !supabase) {
			return {
				tags: defaultAvialableTags,
				actualTagGroup: emptyTagGroup,
			}
		}

		const boardId = getActualBoardId()
		const { data, error } = await supabase
			.from('board_accessories')
			.select('actual_tag_group')
			.eq('id', boardId)

		if (error) throw error

		if (data[0].actual_tag_group) {
			return {
				tags: defaultAvialableTags,
				actualTagGroup: data[0].actual_tag_group,
			}
		}

		return {
			tags: defaultAvialableTags,
			actualTagGroup: emptyTagGroup,
		}
	}
}
