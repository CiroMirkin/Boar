import { supabase } from '@/lib/supabase'
import { UserBoardOnDB } from '../model/UserBoardOnDB'

export const saveUserBoardOnSupabase = async (userBoard: UserBoardOnDB) => {
	try {
		const { error } = await supabase.from('boards').insert(userBoard)
		if (error) throw error
	} catch (e) {
		console.error(e)
	}
}
