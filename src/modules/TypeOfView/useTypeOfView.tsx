import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { TypeOfView } from './model/TypeOfView'

export const useTypeOfView = (): TypeOfView => {
    return useSelector((state: RootState) => state.columnList.view)
}
