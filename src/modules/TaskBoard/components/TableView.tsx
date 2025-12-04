import { useTaskBoardQuery } from '../hooks/useTaskBoardQuery'
import { ListOfColumn, ColumnsContent } from '../../taskList/components/Columns/ListOfColumns'

export function TableView({ children }: { children: () => ColumnsContent }) {
	const { taskBoard } = useTaskBoardQuery()
	const columns = taskBoard.map((list) => ({
		name: list.status,
		id: list.id,
	}))

	const className = 'h-auto pb-5 px-6 md:px-11 flex flex-wrap justify-stretch items-start gap-3'

	return (
		<div className={className}>
			<ListOfColumn columns={columns}>{children}</ListOfColumn>
		</div>
	)
}
