import { defaultView, isValidTypeOfView, TypeOfView, typeOfViewLocalStorageKey } from './typeOfView'
import { useLocalStorage } from '@uidotdev/usehooks'

export const useTypeOfView = (): TypeOfView => {
	const [view] = useLocalStorage<TypeOfView>(typeOfViewLocalStorageKey, defaultView)
	return isValidTypeOfView(view) ? view : defaultView
}
