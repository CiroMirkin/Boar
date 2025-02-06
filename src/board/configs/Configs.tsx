import { Header } from '../../components/Header'
import { USER_IS_IN } from '../../components/userIsIn'
import { ConfigColumns } from './components/ConfigColumns'
import { Separator } from '@/ui/separator'
import { ChangeBoardName } from './components/ChangeBoardName'
import LocalStorageColumnListRepository from '@/columnList/state/localStorageColumnList'
import { ColumnListRepository } from '@/columnList/state/columnListRepository'
import { useEffect } from 'react'
import { useColumnList } from '@/columnList/hooks/useColumnList'
import Reminder from './components/Reminder'

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()

export function Configs() {
	const columnList = useColumnList()
	useEffect(() => columnListRepository.save(columnList), [columnList])

	return (
		<>
			<Header title='Ajustes' whereUserIs={USER_IS_IN.CONFIG} />
			<div className='py-4 md:px-11 px-6'>
				<ChangeBoardName />
			</div>
			<Separator />
			<div className='py-4 md:px-11 px-6'>
				<h2 className='text-2xl'>Columnas</h2>
				<ConfigColumns columnList={columnList} />
			</div>
			<Separator />
			<div className='py-4 md:px-11 px-6'>
				<h2 className='text-2xl'>Crear recordatorio</h2>
				<p className="opacity-75">Cada vez que una tarea llegué a la columna indicada se mostrara el recordatorio en pantalla.</p>
				<Reminder columnList={columnList} />
			</div>
			<Separator />
		</>
	)
}
