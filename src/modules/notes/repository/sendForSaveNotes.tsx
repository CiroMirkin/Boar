import { supabase } from '@/lib/supabase'
import { getUserId } from '@/sharedByModules/hooks/useSyncBoard'
import { type Notes } from '../model/notes'

export const sendForSaveNotes = async ({ notes }: { notes: Notes }) => {
	const user_id = await getUserId()
	const { error } = await supabase.from('boards').update({ notes }).eq('user_id', user_id)

	if (error) throw error
}
