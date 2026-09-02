export const typeOfViewLocalStorageKey = 'type-of-view'

export enum TypeOfView {
	BOARD = 'BOARD',
	LIST = 'LIST',
	NOTE_LIST = 'NOTE-LIST',
}

export const defaultView = TypeOfView.BOARD

export const isValidTypeOfView = (value: string | TypeOfView): value is TypeOfView => {
	return typeof value === 'string' && Object.values(TypeOfView).includes(value as TypeOfView)
}
