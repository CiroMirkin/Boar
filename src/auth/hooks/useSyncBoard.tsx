import { supabase } from '@/lib/supabase'
import { setUserBoard } from '../utils/setUserBoard'
import { Dispatch } from '@reduxjs/toolkit'
import { Session } from '@supabase/supabase-js'
import { Dispatch as ReactDispatch, SetStateAction } from 'react'
import { getActualUserBoard } from '../utils/getActualUserBoard'
import { saveUserBoardOnSupabase } from '../utils/saveUserBoardOnSupabase'

/** Recupera el tablero del usuario de Supabase y si no existe ninguno guarda el tablero actual en Supabase. */
export const syncBoard = async ({
	dispatch,
	session,
	setNote,
}: {
	dispatch: Dispatch
	session: Session
	setNote: ReactDispatch<SetStateAction<string>>
}) => {
	const actualUserBoard = await getActualUserBoard()
	const { data } = await supabase.from('boards').select('*').eq('user_id', session.user.id)

	if (session) {
		if (data != null && data.length === 0) {
			saveUserBoardOnSupabase(actualUserBoard)
		} else if (data != null) {
			const savedUserBoard = data[0]
			setUserBoard({ dispatch, savedUserBoard, setNote })
		}
	}
}
