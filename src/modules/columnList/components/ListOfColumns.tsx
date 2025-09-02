import { Column } from './Column'
import { useColumnList } from '../hooks/useColumnList'
import { useSaveColumnList } from '../state/useSaveColumnList'

export type ColumnsContent = React.ReactNode[]

interface ListOfColumnProps {
	children: () => ColumnsContent
}

export function ListOfColumn({ children: getColumnsContent }: ListOfColumnProps) {
	const columns = useColumnList()
	useSaveColumnList({ columnList: columns })

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
