import { useSession } from '@/SessionProvider'
import { Column } from './components/Column'
import { useColumnList } from './hooks/useColumnList'
import { useEffect } from 'react'
import { sendForSaveColumnList } from './state/sendForSaveColumnList'

export type ColumnsContent = React.ReactNode[]

interface ColumnListProps {
	children: () => ColumnsContent
}

export function ColumnList({ children: getColumnsContent }: ColumnListProps) {
	const columns = useColumnList()

	const { session } = useSession()
	useEffect(() => {
		if(!!session) sendForSaveColumnList(columns)
	}, [])
	const columnsContent = getColumnsContent()

	const columnList = columns.map((column, columnIndex) => {
		return (
			<Column data={column} key={column.id}>
				<Column.ColumnContent className='min-h-64 md:h-[60vh] w-full'>
					{columnsContent[columnIndex] && columnsContent[columnIndex]}
				</Column.ColumnContent>
				<Column.Footer />
			</Column>
		)
	})

	return <>{columnList}</>
}
