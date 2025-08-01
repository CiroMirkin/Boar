import { ColumnsContent } from './components/ListOfColumns'
import { ColumnsContextContent, ColumnsProvider } from './ColumnsContext'
import { TableView } from './components/TableView'
import { ListView } from './components/ListView'
import { useTypeOfView } from './hooks/useTypeOfView'

interface ColumnListProps {
	children: () => ColumnsContent, 
	columnsData: ColumnsContextContent,
}

function ColumnList({ children, columnsData }: ColumnListProps) {
	const typeOfView = useTypeOfView()
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
