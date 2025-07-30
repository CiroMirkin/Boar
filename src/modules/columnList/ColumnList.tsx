import { ColumnsContent } from './components/ListOfColumns'
import { ColumnsContextContent, ColumnsProvider } from './ColumnsContext'
import { TableView } from './components/TableView'

interface ColumnListProps {
	children: () => ColumnsContent, 
	columnsData: ColumnsContextContent,
}

function ColumnList({ children, columnsData }: ColumnListProps) {
	return (
		<ColumnsProvider value={columnsData}>
			<TableView>
				{ children }
			</TableView>
		</ColumnsProvider>
	)
}

export default ColumnList
