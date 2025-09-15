import BusinessError from '@/sharedByModules/errors/businessError'
import i18next from '@/i18next'

export interface boardModel {
	id: string
	name: string
}

export const defaultBoard: boardModel = {
	id: '1',
	name: '',
}

export const isThisBoardNameWithinTheLimitOfLetters = (boardName: string): boolean => {
	return boardName.length < 30
}

export const isThisBoardNameValid = (boardName: string): boolean | BusinessError => {
	if (!boardName.trim()) throw new BusinessError('El tablero debe tener un nobmre.')
	else if (!isThisBoardNameWithinTheLimitOfLetters(boardName))
		throw new BusinessError('El nombre es demasiado largo.')
	return true
}

export const isDefaultBoardName = (boardName: string): boolean => {
	const translations = i18next.services.resourceStore.data
	const boardNameTranslations = Object.values(translations).map(
		(lang) => (lang.translation as { board_name: string }).board_name
	)
	return boardNameTranslations.includes(boardName)
}
