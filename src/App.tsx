import './App.css'
import { Board } from './board/Board'
import { Toaster } from './ui/toaster'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Archive } from './archive/Archive'
import { Configs } from './components/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './columnList/ColumnListContainer'
import { Separator } from './ui/separator'
import { ChangeBoardName } from './board/components/ChangeBoardName'
import { ConfigColumns } from './columnList/components/ConfigColumns'
import Reminder from './columnList/components/Reminder'

const ConfigsPage = () => <Configs>
	<div className='py-4 md:px-11 px-6'>
		<ChangeBoardName />
	</div>
	<Separator />
	<div className='py-4 md:px-11 px-6'>
		<ConfigColumns />
	</div>
	<Separator />
	<div className='py-4 md:px-11 px-6'>
		<Reminder />
	</div>
	<Separator />
</Configs>

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
		element: <ConfigsPage />,
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
