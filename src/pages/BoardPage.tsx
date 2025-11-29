import { Board } from '@/modules/board/Board'
import { ColumnsProvider, ColumnsContextContent } from '@/modules/taskList/Columns/ColumnsContext'
import { ArchiveTaskListButton } from '@/modules/taskList/ArchivedTasks/components/ArchiveTaskListButton'
import { AddNewTaskInput } from '@/modules/taskList/components/AddNewTaskInput'
import { TaskListInEachColumn } from '@/modules/taskList/TaskListInEachColumn'
import PageContainer from './PageContainer'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { ListView } from '@/modules/taskList/Columns/ListView'
import { TableView } from '@/modules/taskList/Columns/TableView'
import { useTypeOfView } from '@/modules/TypeOfView/useTypeOfView'
import { NoteInput } from '@/modules/notes/components/NoteInput'

const columnsData: ColumnsContextContent = {
	firstColumnFooterContent: <AddNewTaskInput />,
	lastColumnFooterContent: <ArchiveTaskListButton />,
}

export function BoardPage() {
	const { board } = useBoardQuery()
	const typeOfView = useTypeOfView()
	return (
		<PageContainer title={board?.name || 'Board'} whereUserIs={USER_IS_IN.BOARD}>
			<Board>
				<ColumnsProvider value={columnsData}>
					{typeOfView == 'LIST' && (
						<div className='p-5'>
							<ListView>{TaskListInEachColumn}</ListView>
						</div>
					)}
					{typeOfView == 'BOARD' && <TableView>{TaskListInEachColumn}</TableView>}
					{typeOfView == 'NOTE-LIST' && (
						<div className='flex md:flex-nowrap flex-wrap-reverse justify-stretch items-start gap-4 px-8 md:px-20'>
							<ListView className='my-4'>{TaskListInEachColumn}</ListView>
							<div className='w-full py-4 md:sticky static  top-0 '>
								<NoteInput />
							</div>
						</div>
					)}
				</ColumnsProvider>
			</Board>
		</PageContainer>
	)
}
