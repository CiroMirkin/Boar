import BoardCard from './components/BoardCard'
import { useDashboardQuery } from './hooks/useDashboardQuery'
import CreateBoardDialog from './components/CreateBoardDialog'
import { Spinner } from '@/ui/atoms/spinner'

function Dashboard() {
	const { boards, isLoading } = useDashboardQuery()

	if (isLoading) {
		return (
			<section className='w-full min-h-64 md:min-h-[60vh] grid place-items-center'>
				<Spinner size={30} />
			</section>
		)
	}

	return (
		<section className='min-w-48 min-h-64 md:min-h-[60vh] items-center'>
			<ul className='px-2 list-none flex gap-6'>
				{boards.map((board) => (
					<BoardCard board={board} key={board.id} />
				))}

				<li className='self-end '>
					<CreateBoardDialog />
				</li>
			</ul>
		</section>
	)
}

export default Dashboard
