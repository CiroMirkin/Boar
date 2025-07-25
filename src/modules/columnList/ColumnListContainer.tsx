import { ColumnList, ColumnsContent } from './ColumnList'
import { ColumnsContextContent, ColumnsProvider } from './ColumnsContext'

function ColumnListContainer({ children, columnsData }: { children: () => ColumnsContent, columnsData: ColumnsContextContent}) {
	return (
		<ColumnsProvider value={columnsData}>
			<div className='h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch items-start gap-3'>
				<ColumnList>{ children }</ColumnList>
			</div>
		</ColumnsProvider>
	)
}

export default ColumnListContainer
