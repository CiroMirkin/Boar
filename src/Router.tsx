import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board } from './modules/board/Board'
import { Configs } from './pages/Configs'
import { Erro404 } from './pages/404'
import { Help } from './pages/Help'
import Auth from './pages/Auth'
import ColumnListContainer from './modules/columnList/ColumnListContainer'
import { TaskListInEachColumn } from './modules/taskList/TaskListInEachColumn'
import ErrorBoundary from './ErrorBoundary'


import { AddNewTaskInput } from './modules/taskList/components/AddNewTaskInput'
import { ArchiveTaskListButton } from './modules/taskList/archive/components/ArchiveTaskListButton'
import { ColumnsContextContent } from './modules/columnList/ColumnsContext'
import { ArchivePage } from './pages/ArchivePage'

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
		element: <ErrorBoundary><BoardPage /></ErrorBoundary>,
	},
	{
		path: '/archive',
		element: <ErrorBoundary><ArchivePage /></ErrorBoundary>,
	},
	{
		path: '/settings',
		element: <ErrorBoundary><Configs /></ErrorBoundary>,
	},
	{
		path: '/help',
		element: <ErrorBoundary><Help /></ErrorBoundary>,
	},
	{
		path: '/auth',
		element: <Auth/>,
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
