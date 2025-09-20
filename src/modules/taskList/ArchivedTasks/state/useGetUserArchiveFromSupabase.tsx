import { supabase } from '@/lib/supabase'
import { setArchive } from './archiveReducer'
import { getUserId } from '@/sharedByModules/hooks/getUserId'
import { store } from '@/store'
import { SessionType } from '@/SessionProvider'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

/** Hook que obtiene el archive del usuario guardado en Supabase y lo establece. */
export const useGetUserArchiveFromSupabase = (session: SessionType) => {
	const dispatch = useDispatch()
	useEffect(() => {
		const fetchUserArchive = async () => {
			if (session) {
				const { data } = await supabase.from('archive').select('*')

				if (data != null && data.length === 0) {
					const userId = getUserId()
					const { error } = await supabase.from('archive').insert({
						user_id: userId,
						task_list: store.getState().archive.list,
					})
					if (error) throw error
				} else if (data != null) {
					const archive = data[0].task_list
					dispatch(setArchive(archive))
				}
			}
		}

		fetchUserArchive()
	}, [session, dispatch])
}
