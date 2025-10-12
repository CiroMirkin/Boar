import { Session } from '@supabase/supabase-js'
import { ColumnList } from '../models/columnList'
import { ColumnListRepository } from './columnListRepository'
import LocalStorageColumnListRepository from './localStorageColumnList'
import SupabaseColumnListRepository from './supabaseRepository'

// Factory para obtener el repositorio correcto
const getColumnListRepository = (session: Session | null): ColumnListRepository => {
	if (session) {
		return new SupabaseColumnListRepository()
	}
	return new LocalStorageColumnListRepository()
}

// Funciones que usarán los hooks de React Query
export const fetchColumnList = async (session: Session | null): Promise<ColumnList> => {
	const repository = getColumnListRepository(session)
	return repository.getAll()
}

export const saveColumnList = async ({
	columnList,
	session,
}: {
	columnList: ColumnList
	session: Session | null
}): Promise<void> => {
	const repository = getColumnListRepository(session)
	await repository.save(columnList)
}
