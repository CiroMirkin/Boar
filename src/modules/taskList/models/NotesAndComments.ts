
export type NotesAndComments = string

export const maxLengthOfNotesAndComments = 5000

/** @returns True si notesAndComments esta dentro del limite de caracteres permitido. */
export const checkMaxLengthOfNotesAndComments = (notesAndComments: NotesAndComments): boolean => {
	return notesAndComments.trim().length <= maxLengthOfNotesAndComments
}
