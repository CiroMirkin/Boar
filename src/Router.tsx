import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Settings } from './pages/Settings'
import { Erro404 } from './pages/404'
import { Help } from './pages/Help'
import Auth from './pages/Auth'
import { ArchivePage } from './pages/ArchivePage'
import { BoardPage } from './pages/BoardPage'
import ErrorBoundary from './ErrorBoundary'

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
		element: <ErrorBoundary><Settings /></ErrorBoundary>,
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
