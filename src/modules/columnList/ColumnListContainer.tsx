import { TaskListInEachColumnProvider } from './taskList/contexts/TaskListInEachColumnContext'
import { ColumnList, ColumnsContent } from './ColumnList'

function ColumnListContainer({ children }: { children: () => ColumnsContent}) {
	return (
		<TaskListInEachColumnProvider>
			<div className='h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch gap-y-3 gap-x-4'>
				<ColumnList>{ children }</ColumnList>
			</div>
		</TaskListInEachColumnProvider>
	)
}

export default ColumnListContainer
