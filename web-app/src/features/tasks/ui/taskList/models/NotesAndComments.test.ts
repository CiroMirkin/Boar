import { checkMaxLengthOfNotesAndComments, maxLengthOfNotesAndComments } from './NotesAndComments'

describe('checkMaxLengthOfNotesAndComments - Validación de longitud máxima de texto', () => {
	test('Debe retornar true cuando el texto está vacío', () => {
		const emptyText = ''
		const result = checkMaxLengthOfNotesAndComments(emptyText)
		expect(result).toBeTruthy()
	})

	test('Debe retornar true cuando el texto tiene una longitud válida', () => {
		const validText = 'Es necesario hacerlo antes que llegue el viernes.'
		const result = checkMaxLengthOfNotesAndComments(validText)
		expect(result).toBeTruthy()
	})

	test('Debe retornar true cuando el texto tiene exactamente la longitud máxima permitida', () => {
		const textAtExactLimit = '*'.repeat(maxLengthOfNotesAndComments)
		const result = checkMaxLengthOfNotesAndComments(textAtExactLimit)
		expect(result).toBeTruthy()
	})

	test('Debe retornar false cuando el texto excede la longitud máxima permitida', () => {
		const textExceedingLimit = '*'.repeat(maxLengthOfNotesAndComments + 10)
		const result = checkMaxLengthOfNotesAndComments(textExceedingLimit)
		expect(result).toBeFalsy()
	})
})
