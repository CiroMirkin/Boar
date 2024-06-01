import './App.css'
import { Board } from './components/board/Board'
import { Toaster } from './ui/toaster'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Archive } from './components/archive/Archive'
import { Configs } from './components/configs/Configs'
import { Erro404 } from './components/404/404'
import { Help } from './components/help/Help'

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
