import './App.css'
import { Board } from './pages/board/Board'
import { Toaster } from './ui/toaster'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Archive } from './pages/archive/Archive'
import { Configs } from './pages/configs/Configs'
import { Erro404 } from './pages/404/404'
import { Help } from './pages/help/Help'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Board />,
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

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	)
}

export default App
