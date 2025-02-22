import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board } from './modules/board/Board'
import { Archive } from './modules/archive/Archive'
import { Configs } from './components/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './modules/columnList/ColumnListContainer'
import { TaskListInEachColumn } from './modules/columnList/taskList/TaskListInEachColumn'

const BoardPage = () => (
	<Board>
		<ColumnListContainer>
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
