import { useSession } from '@/SessionProvider'
import { Column } from './components/Column'
import { useColumnList } from './hooks/useColumnList'
import { useEffect } from 'react'
import { useSaveColumnList } from './state/useSaveColumnList'

export type ColumnsContent = React.ReactNode[]

interface ColumnListProps {
	children: () => ColumnsContent
}

export function ColumnList({ children: getColumnsContent }: ColumnListProps) {
	const columns = useColumnList()

	const { session } = useSession()
	useEffect(() => {
		useSaveColumnList({ session, columnList: columns })
	}, [columns])

	const columnsContent = getColumnsContent()
	const columnList = columns.map((column, columnIndex) => {
		return (
			<Column data={column} key={column.id}>
				<Column.ColumnContent className='h-auto w-full'>
					{columnsContent[columnIndex] && columnsContent[columnIndex]}
				</Column.ColumnContent>
				<Column.Footer />
			</Column>
		)
	})

	return <>{columnList}</>
}
