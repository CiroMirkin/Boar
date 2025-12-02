import { Session } from '@supabase/supabase-js'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export type SessionType = Session | null

interface SessionContextValue {
	session: SessionType
	setSession: Dispatch<SetStateAction<SessionType>>
	isSupabaseConfigured: boolean
}

export const SessionContext = createContext({
	session: null,
	setSession: () => {},
	isSupabaseConfigured: false,
} as SessionContextValue)

export default function SessionProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<SessionType>(null)
	const isSupabaseConfigured = supabase !== null

	useEffect(() => {
		if (!isSupabaseConfigured || !supabase) {
			console.warn('Supabase no está configurado. La autenticación no estará disponible.')
			return
		}

		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [isSupabaseConfigured])

	return (
		<SessionContext.Provider value={{ session, setSession, isSupabaseConfigured }}>
			{children}
		</SessionContext.Provider>
	)
}
