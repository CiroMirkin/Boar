import { defaultView, isValidTypeOfView, TypeOfView, typeOfViewLocalStorageKey } from './TypeOfView'
import { useLocalStorage } from '@uidotdev/usehooks'


export const useTypeOfView = (): TypeOfView => {
    const [view] = useLocalStorage<TypeOfView>(typeOfViewLocalStorageKey, defaultView)
    return isValidTypeOfView(view) ? view : defaultView
}