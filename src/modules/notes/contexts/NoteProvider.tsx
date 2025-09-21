import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { defaultNotes, Notes } from '../model/notes'

interface UserNote {
	note: Notes
	setNote: Dispatch<SetStateAction<string>>
}

const NoteContext = createContext({
	note: defaultNotes,
	setNote: () => {},
} as UserNote)

export const useNote = () => useContext(NoteContext)

export function NoteProvider({ children }: { children: ReactNode }) {
	const [note, setNote] = useState(defaultNotes)
	return <NoteContext.Provider value={{ note, setNote }}>{children}</NoteContext.Provider>
}
