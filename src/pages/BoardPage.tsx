import { Board } from '@/modules/board/Board'
import { ColumnsFooterContentProvider } from '@/modules/TaskBoard/components/Columns/context/ColumnsFooter/ColumnsFooterContentProvider'
import { ColumnsFooterContent } from '@/modules/TaskBoard/components/Columns/context/ColumnsFooter/columnsFooterContent'
import { ArchiveTaskListButton } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/components/ArchiveTaskListButton'
import { AddNewTaskInput } from '@/modules/TaskBoard/components/taskList/components/AddNewTaskInput'
import { TaskListInEachColumn } from '@/modules/TaskBoard/components/taskList/TaskListInEachColumn'
import PageContainer from './PageContainer'
import { useBoardQuery } from '@/modules/board/hooks/useBoardQuery'
import { USER_IS_IN } from '@/ui/organisms/userIsIn'
import { ListView } from '@/modules/TaskBoard/components/ListView'
import { TableView } from '@/modules/TaskBoard/components/TableView'
import { useTypeOfView } from '@/modules/TypeOfView/useTypeOfView'
import { NoteInput } from '@/modules/notes/components/NoteInput'
import { useTaskBoardQuery } from '@/modules/TaskBoard/hooks/useTaskBoardQuery'
import { useReminder } from '@/modules/TaskBoard/components/Reminder/hooks/useReminder'
import { useSession } from '@/auth/hooks/useSession'
import { Spinner } from '@/ui/atoms/spinner'
import { useLoadingTimeout } from '@/common/hooks/useLoadingTimeout'

const columnsData: ColumnsFooterContent = {
	firstColumnFooterContent: <AddNewTaskInput />,
	lastColumnFooterContent: <ArchiveTaskListButton />,
}

export function BoardPage() {
	const { board } = useBoardQuery()
	const typeOfView = useTypeOfView()
	const { taskBoard, isLoading: isTaskBoardLoading } = useTaskBoardQuery()
	const { session, isLoading: isLoadingSession } = useSession()

	const tasksList = taskBoard.map((column) => column.tasks)
	useReminder(tasksList)

	const showSpinner = useLoadingTimeout({
		session,
		isLoading: isTaskBoardLoading,
		timeout: 500,
	})

	if (isLoadingSession || showSpinner) {
		return (
			<PageContainer title='Board' whereUserIs={USER_IS_IN.BOARD}>
				<div className='min-w-48 min-h-64 md:min-h-[60vh] flex items-center justify-center'>
					<Spinner size={30} />
				</div>
			</PageContainer>
		)
	}

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
							<div className='w-full py-4 md:sticky static top-0'>
								<NoteInput />
							</div>
						</div>
					)}
				</ColumnsFooterContentProvider>
			</Board>
		</PageContainer>
	)
}
