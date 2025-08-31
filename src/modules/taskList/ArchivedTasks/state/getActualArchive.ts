import { store } from '@/store'
import { Archive } from '../models/archive'

/** Permite recuperar el archivo sin usar el hook useSelector() */
export const getActalArchive = (): Archive => store.getState().archive.list
