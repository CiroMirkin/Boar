import { ColumnsContent, ListOfColumn } from './components/ListOfColumns'
import { ColumnsContextContent, ColumnsProvider } from './ColumnsContext'

interface ColumnListProps {
	children: () => ColumnsContent, 
	columnsData: ColumnsContextContent,
}

function ColumnList({ children, columnsData }: ColumnListProps) {
	return (
		<ColumnsProvider value={columnsData}>
			<div className='h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch items-start gap-3'>
				<ListOfColumn>{ children }</ListOfColumn>
			</div>
		</ColumnsProvider>
	)
}

export default ColumnList
