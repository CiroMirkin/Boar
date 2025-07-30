import { ColumnsContent } from './components/ListOfColumns'
import { ColumnsContextContent, ColumnsProvider } from './ColumnsContext'
import { TableView } from './components/TableView'
import { ListView } from './components/ListView'

export type TypeOfView = 'BOARD' | 'LIST'

interface ColumnListProps {
	children: () => ColumnsContent, 
	columnsData: ColumnsContextContent,
	typeOfView?: TypeOfView,
}

function ColumnList({ children, columnsData, typeOfView = 'BOARD' }: ColumnListProps) {
	if(typeOfView == 'LIST') {
		return (
			<ColumnsProvider value={columnsData}>
				<ListView>
					{ children }
				</ListView>
			</ColumnsProvider>
		)
	}

	return (
		<ColumnsProvider value={columnsData}>
			<TableView>
				{ children }
			</TableView>
		</ColumnsProvider>
	)
}

export default ColumnList
