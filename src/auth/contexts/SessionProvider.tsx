import { Session } from '@supabase/supabase-js'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export type SessionType = Session | null

interface SessionContextValue {
	session: SessionType
	setSession: Dispatch<SetStateAction<SessionType>>
	isSupabaseConfigured: boolean
	isLoading: boolean
}

export const SessionContext = createContext({
	session: null,
	setSession: () => {},
	isSupabaseConfigured: false,
	isLoading: true,
} as SessionContextValue)

export default function SessionProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<SessionType>(null)
	const [isLoading, setIsLoading] = useState(true)
	const isSupabaseConfigured = supabase !== null

	useEffect(() => {
		if (!isSupabaseConfigured || !supabase) {
			console.warn('Supabase no está configurado. La autenticación no estará disponible.')
			setIsLoading(false)
			return
		}

		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
			setIsLoading(false)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [isSupabaseConfigured])

	return (
		<SessionContext.Provider value={{ session, setSession, isSupabaseConfigured, isLoading }}>
			{children}
		</SessionContext.Provider>
	)
}
