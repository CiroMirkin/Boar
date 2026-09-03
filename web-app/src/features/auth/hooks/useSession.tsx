import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionProvider'

export const useSession = () => useContext(SessionContext)
