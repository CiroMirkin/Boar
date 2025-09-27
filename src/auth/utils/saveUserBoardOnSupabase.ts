import { supabase } from '@/lib/supabase'
import { UserBoardOnSupabase } from '../model/UserBoardOnSupabase'

export const saveUserBoardOnSupabase = async (userBoard: UserBoardOnSupabase) => {
	try {
		const { error } = await supabase.from('boards').insert(userBoard)
		if (error) throw error
	} catch (e) {
		console.error(e)
	}
}
