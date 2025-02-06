import './App.css'
import { Board } from './board/Board'
import { Toaster } from './ui/toaster'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Archive } from './archive/Archive'
import { Configs } from './board/configs/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './columnList/ColumnListContainer'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Board> <ColumnListContainer/> </Board>,
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
