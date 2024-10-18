import { Header } from '../Header'
import { USER_IS_IN } from '../userIsIn'
import { ConfigColumns } from './ConfigColumns'
import { Separator } from '@/ui/separator'
import { ChangeBoardName } from './ChangeBoardName'
import LocalStorageColumnListRepository from '@/repositories/localStorageColumnList'
import { ColumnListRepository } from '@/models/columnListRepository'
import { useEffect } from 'react'
import { useColumnList } from '@/hooks/useColumnList'
import { useBoard } from '@/hooks/useBoard'
import { BoardRepository } from '@/models/boardRepository'
import LocalStorageBoardRepository from '@/repositories/localstorageBoard'

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
				<Separator />
			</div>
		</>
	)
}
