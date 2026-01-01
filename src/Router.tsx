import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Settings } from './pages/Settings'
import { Erro404 } from './pages/404'
import { Help } from './pages/Help'
import Auth from './pages/Auth'
import { BoardArchive } from './pages/BoardArchive'
import { BoardPage } from './pages/BoardPage'
import ErrorBoundary from './ErrorBoundary'
import { TimeTracking } from './pages/TimeTracking'
import UserDashboard from './pages/UserDashboard'
import UserDashboardSettings from './pages/UserDashboardSettings'
import { useUpdateBoardId } from './auth/hooks/useUpdateBoardId'
import { Outlet } from 'react-router-dom'

function Layout() {
	useUpdateBoardId()
	return (
		<ErrorBoundary>
			<Outlet />
		</ErrorBoundary>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <UserDashboard />,
			},
			{
				path: 'settings',
				element: <UserDashboardSettings />,
			},
			{
				path: 'board/:id',
				element: <BoardPage />,
			},
			{
				path: 'archive/:id',
				element: <BoardArchive />,
			},
			{
				path: 'settings/:id',
				element: <Settings />,
			},
			{
				path: 'time/:id',
				element: <TimeTracking />,
			},
			{
				path: 'help',
				element: <Help />,
			},
		],
	},
	{
		path: '/auth',
		element: <Auth />,
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
