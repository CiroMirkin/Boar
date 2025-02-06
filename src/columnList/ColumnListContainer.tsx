import { TaskListInEachColumnProvider } from "./taskList/contexts/TaskListInEachColumnContext"
import { ColumnList } from "./ColumnList"

function ColumnListContainer() {

    return (
		<TaskListInEachColumnProvider>
            <div className='h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch gap-y-3 gap-x-4'>
                <ColumnList />
			</div>
		</TaskListInEachColumnProvider>
    )
}

export default ColumnListContainer