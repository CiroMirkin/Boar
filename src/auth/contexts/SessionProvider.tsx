import { Session } from '@supabase/supabase-js'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export type SessionType = Session | null
interface SessionContextValue {
	session: SessionType
	setSession: Dispatch<SetStateAction<SessionType>>
}
export const SessionContext = createContext({
	session: null,
	setSession: () => {},
} as SessionContextValue)

export default function SessionProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<SessionType>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	return (
		<SessionContext.Provider value={{ session, setSession }}>
			{children}
		</SessionContext.Provider>
	)
}
