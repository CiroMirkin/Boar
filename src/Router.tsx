import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board } from './modules/board/Board'
import { Archive } from './modules/archive/Archive'
import { Configs } from './components/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './modules/columnList/ColumnListContainer'
import { TaskListInEachColumn } from './modules/taskList/TaskListInEachColumn'

import { AddNewTaskInput } from './modules/taskList/AddNewTaskInput'
import { ArchiveTaskListButton } from './modules/shared/components/ArchiveTaskListButton'
import { ColumnsContextContent } from './modules/columnList/ColumnsContext'

const columnsData: ColumnsContextContent = {
	firstColumnFooterContent: <AddNewTaskInput/>,
	lastColumnFooterContent: <ArchiveTaskListButton/>,
}

const BoardPage = () => (
	<Board>
		<ColumnListContainer columnsData={columnsData}>
			{ TaskListInEachColumn }
		</ColumnListContainer>
	</Board>
)

const router = createBrowserRouter([
	{
		path: '/',
		element: <BoardPage />,
	},
	{
		path: '/archive',
		element: <Archive />,
	},
	{
		path: '/settings',
		element: <Configs />,
	},
	{
		path: '/help',
		element: <Help />,
	},
	{
		path: '*',
		element: <Erro404 />,
	},
])

function Router() {
	return <RouterProvider router={router} />
}

export default Router
