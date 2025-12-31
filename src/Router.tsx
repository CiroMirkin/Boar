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

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ErrorBoundary>
				<UserDashboard />
			</ErrorBoundary>
		),
	},
	{
		path: '/settings',
		element: (
			<ErrorBoundary>
				<UserDashboardSettings />
			</ErrorBoundary>
		),
	},
	{
		path: '/board/:id',
		element: (
			<ErrorBoundary>
				<BoardPage />
			</ErrorBoundary>
		),
	},
	{
		path: '/archive/:id',
		element: (
			<ErrorBoundary>
				<BoardArchive />
			</ErrorBoundary>
		),
	},
	{
		path: '/settings/:id',
		element: (
			<ErrorBoundary>
				<Settings />
			</ErrorBoundary>
		),
	},
	{
		path: '/time/:id',
		element: (
			<ErrorBoundary>
				<TimeTracking />
			</ErrorBoundary>
		),
	},
	{
		path: '/help',
		element: (
			<ErrorBoundary>
				<Help />
			</ErrorBoundary>
		),
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
