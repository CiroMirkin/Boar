import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board } from './board/Board'
import { Archive } from './archive/Archive'
import { Configs } from './components/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './columnList/ColumnListContainer'
import { Separator } from './ui/separator'
import { ChangeBoardName } from './board/components/ChangeBoardName'
import { ConfigColumns } from './columnList/components/ConfigColumns'
import Reminder from './columnList/components/Reminder'

const ConfigsPage = () => (
    <Configs>
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
)

const BoardPage = () => <Board> <ColumnListContainer/> </Board>

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

function Router() {
    return (
        <RouterProvider router={router} />
    )
}

export default Router