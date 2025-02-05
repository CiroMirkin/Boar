import { Header } from '../../Header'
import { USER_IS_IN } from '../../userIsIn'
import { ConfigColumns } from './components/ConfigColumns'
import { Separator } from '@/ui/separator'
import { ChangeBoardName } from './components/ChangeBoardName'
import LocalStorageColumnListRepository from '@/repositories/localStorageColumnList'
import { ColumnListRepository } from '@/pages/board/columnList/state/columnListRepository'
import { useEffect } from 'react'
import { useColumnList } from '@/pages/board/columnList/hooks/useColumnList'
import { useBoard } from '@/pages/board/hooks/useBoard'
import { BoardRepository } from '@/pages/board/models/boardRepository'
import LocalStorageBoardRepository from '@/pages/board/state/localstorageBoard'
import Reminder from './components/Reminder'

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()
const boardRepository: BoardRepository = new LocalStorageBoardRepository()

export function Configs() {
	const columnList = useColumnList()
	const boardData = useBoard()

	useEffect(() => boardRepository.save(boardData), [boardData])
	useEffect(() => columnListRepository.save(columnList), [columnList])

	return (
		<>
			<Header title='Ajustes' whereUserIs={USER_IS_IN.CONFIG} />
			<div className='py-4 md:px-11 px-6'>
				<h2 className='text-2xl'>Tablero</h2>
				<div className='my-5 flex items-end'>
					<ChangeBoardName name={boardData.name} />
				</div>
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
