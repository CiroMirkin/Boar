import React from 'react'
import { Column } from '../../../columnList/models/column'
import { ConfigColumn } from './ConfigColumn'
import { AddNewColumnForm } from './AddNewColumnForm'

interface ConfigColumnsParams {
	columnList: Column[]
}

export function ConfigColumns({ columnList }: ConfigColumnsParams) {
	const columns: React.ReactNode[] = columnList.map((column) => (
		<ConfigColumn column={column} key={column.id} />
	))
	return (
		<ul className='h-auto w-full max-w-2xl py-5 flex flex-wrap flex-col justify-start gap-y-3 gap-x-3.5'>
			{columns}
			<AddNewColumnForm />
		</ul>
	)
}
