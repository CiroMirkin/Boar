import React, { useEffect } from 'react'
import { ConfigColumn } from './ConfigColumn'
import { AddNewColumnForm } from './AddNewColumnForm'
import LocalStorageColumnListRepository from '@/columnList/state/localStorageColumnList'
import { ColumnListRepository } from '@/columnList/state/columnListRepository'
import { useColumnList } from '@/columnList/hooks/useColumnList'
import { useTranslation } from 'react-i18next'

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()

export function ConfigColumns({ }) {
	const { t } = useTranslation()
	const columnList = useColumnList()
	useEffect(() => columnListRepository.save(columnList), [columnList])

	const columns: React.ReactNode[] = columnList.map((column) => (
		<ConfigColumn column={column} key={column.id} />
	))
	return (
		<>
			<h2 className='text-2xl'>{ t('settings.columns.section_title') }</h2>
			<ul className='h-auto w-full max-w-2xl py-5 flex flex-wrap flex-col justify-start gap-y-3 gap-x-3.5'>
				{columns}
				<AddNewColumnForm />
			</ul>
		</>
	)
}
