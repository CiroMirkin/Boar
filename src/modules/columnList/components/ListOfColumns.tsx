import { Column } from './Column'
import { useColumnListQuery } from '../hooks/useColumnListQuery'

export type ColumnsContent = React.ReactNode[]

interface ListOfColumnProps {
	children: () => ColumnsContent
}

export function ListOfColumn({ children: getColumnsContent }: ListOfColumnProps) {
	const { columnList: columns } = useColumnListQuery()

	const columnsContent = getColumnsContent()
	const columnList = (columns || []).map((column, columnIndex) => {
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
