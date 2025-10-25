import { SessionType } from '@/auth/contexts/SessionProvider'
import { emptyTaskListInEachColumn, TaskListInEachColumn } from '../models/taskList'
import LocalStorageTaskListInEachColumnRepository from '../repository/localStorageTaskListsRepository'
import { useEffect, useRef } from 'react'
import SupabaseTaskListInEachColumnRepository from '../repository/supabaseTaskListsRepository'

interface useSaveTaskListOfColumnsParams {
	data: TaskListInEachColumn
	session: SessionType
	emptyData?: boolean
}

/** Guarda la entidad TaskListInEachColumn */
export const useSaveTaskListOfColumns = ({ data, session }: useSaveTaskListOfColumnsParams) => {
	const taskListInEachColumnRef = useRef(emptyTaskListInEachColumn)

	useEffect(() => {
		const taskListInEachColumnLikeString = JSON.stringify(data)
		// Si la lista de tareas actualmente esta vacia y anteriormente contuvo informacion
		if (
			taskListInEachColumnLikeString == JSON.stringify(emptyTaskListInEachColumn) &&
			taskListInEachColumnLikeString !== JSON.stringify(taskListInEachColumnRef.current)
		) {
			save({
				session,
				data: data,
				emptyData: true,
			})
		} else {
			save({ session, data: data })
		}
		taskListInEachColumnRef.current = data
	}, [data])
}

const save = ({ data, session, emptyData = false }: useSaveTaskListOfColumnsParams) => {
	const localStorage = new LocalStorageTaskListInEachColumnRepository()
	const localTaskListOfColumns = localStorage.getAll()

	if (JSON.stringify(data) !== JSON.stringify(emptyTaskListInEachColumn) || emptyData) {
		const isNotTheLocalTaskListOfColumns =
			JSON.stringify(data) !== JSON.stringify(localTaskListOfColumns)
		if (!!session && isNotTheLocalTaskListOfColumns) {
			const supabase = new SupabaseTaskListInEachColumnRepository()
			supabase.save(data)
		} else {
			localStorage.save(data)
		}
	}
}
