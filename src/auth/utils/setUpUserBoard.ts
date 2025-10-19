import { supabase } from '@/lib/supabase'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { getActualUserBoard } from './getActualUserBoard'
import { saveUserBoardOnSupabase } from './saveUserBoardOnSupabase'

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const setUpUserBoard = async ({ session }: { dispatch: Dispatch; session: Session }) => {
	const actualUserBoard = await getActualUserBoard()
	const { data } = await supabase.from('boards').select('*').eq('user_id', session.user.id)

	if (session) {
		if (data != null && data.length === 0) {
			saveUserBoardOnSupabase(actualUserBoard)
		}
	}
}
