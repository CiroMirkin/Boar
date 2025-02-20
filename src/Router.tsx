import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Board } from './modules/board/Board'
import { Archive } from './modules/archive/Archive'
import { Configs } from './components/Configs'
import { Erro404 } from './components/404'
import { Help } from './components/Help'
import ColumnListContainer from './modules/columnList/ColumnListContainer'
import { Separator } from './ui/separator'
import { ChangeBoardName } from './modules/board/components/ChangeBoardName'
import { ConfigColumns } from './modules/columnList/components/ConfigColumns'
import Reminder from './modules/columnList/components/Reminder'
import { ColorTheme } from './components/ColorTheme'

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
		<div className="py-4 md:px-11 px-6">
			<ColorTheme />
		</div>
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