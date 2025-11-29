import { Column } from './Column'
import { ColumnPosition } from './columnPosition'

export type ColumnsContent = React.ReactNode[]

interface ListOfColumnProps {
	columns: string[]
	children: () => ColumnsContent
}

export function ListOfColumn({ columns, children: getColumnsContent }: ListOfColumnProps) {
	const columnsContent = getColumnsContent()
	const columnList = columns.map((column, index) => {
		let columnPosition: ColumnPosition = ''
		if (index === 0) columnPosition = 'FIRST'
		else if (columns.length - 1 === index) columnPosition = 'LAST'

		return (
			<Column columnPosition={columnPosition} columnName={column} key={column}>
				<Column.ColumnContent className='h-auto w-full'>
					{columnsContent[index] && columnsContent[index]}
				</Column.ColumnContent>
				<Column.Footer />
			</Column>
		)
	})

	return <>{columnList}</>
}
