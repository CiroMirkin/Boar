import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { TypeOfView } from '../models/TypeOfView'

export const useTypeOfView = (): TypeOfView => {
    return useSelector((state: RootState) => state.columnList.view)
}
