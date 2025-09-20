import { supabase } from '@/lib/supabase'
import { getUserId } from '@/sharedByModules/hooks/getUserId'
import { Archive } from '../models/archive'

export const sendForSaveArchive = async (archive: Archive) => {
	const user_id = await getUserId()
	const { error } = await supabase
		.from('archive')
		.update({
			task_list: archive,
		})
		.eq('user_id', user_id)

	if (error) throw error
}
