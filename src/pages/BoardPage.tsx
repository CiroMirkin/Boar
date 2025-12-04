import { Board } from '@/modules/board/Board'
import { ColumnsFooterContentProvider } from '@/modules/TaskBoard/components/Columns/context/ColumnsFooter/ColumnsFooterContentProvider'
import { ColumnsFooterContent } from '@/modules/TaskBoard/components/Columns/context/ColumnsFooter/columnsFooterContent'
import { ArchiveTaskListButton } from '@/modules/taskList/components/ArchivedTasks/components/ArchiveTaskListButton'
import { AddNewTaskInput } from '@/modules/taskList/components/AddNewTaskInput'
import { TaskListInEachColumn } from '@/modules/taskList/TaskListInEachColumn'
import PageContainer from './PageContainer'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { ListView } from '@/modules/TaskBoard/components/ListView'
import { TableView } from '@/modules/TaskBoard/components/TableView'
import { useTypeOfView } from '@/modules/TypeOfView/useTypeOfView'
import { NoteInput } from '@/modules/notes/components/NoteInput'

const columnsData: ColumnsFooterContent = {
	firstColumnFooterContent: <AddNewTaskInput />,
	lastColumnFooterContent: <ArchiveTaskListButton />,
}

export function BoardPage() {
	const { board } = useBoardQuery()
	const typeOfView = useTypeOfView()
	return (
		<PageContainer title={board?.name || 'Board'} whereUserIs={USER_IS_IN.BOARD}>
			<Board>
				<ColumnsFooterContentProvider value={columnsData}>
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
				</ColumnsFooterContentProvider>
			</Board>
		</PageContainer>
	)
}
