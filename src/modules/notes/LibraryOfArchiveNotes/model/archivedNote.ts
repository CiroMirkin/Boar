import { Notes } from '@/modules/notes/model/notes'

export interface ArchivedNote {
	id: string
	date: string
	note: Notes
}

export type ListOfArchivedNotes = ArchivedNote[]
