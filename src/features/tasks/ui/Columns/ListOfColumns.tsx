import { Column } from './components/Column'
import { Column as ColumnModel } from './model/column'
import { ColumnPosition } from './model/columnPosition'

export type ColumnsContent = React.ReactNode[]

interface ListOfColumnProps {
	columns: ColumnModel[]
	children: () => ColumnsContent
}

export function ListOfColumn({ columns, children: getColumnsContent }: ListOfColumnProps) {
	const columnsContent = getColumnsContent()
	const columnList = columns.map((column, index) => {
		let columnPosition: ColumnPosition = ''
		if (index === 0) columnPosition = 'FIRST'
		else if (columns.length - 1 === index) columnPosition = 'LAST'

		return (
			<Column columnPosition={columnPosition} columnName={column.name} key={column.id}>
				<Column.ColumnContent className='h-auto w-full'>
					{columnsContent[index] && columnsContent[index]}
				</Column.ColumnContent>
				<Column.Footer />
			</Column>
		)
	})

	return <>{columnList}</>
}
