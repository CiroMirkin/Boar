import { useTheme } from '@/commond/hooks/useTheme'
import { ListOfColumn, ColumnsContent } from '../../taskList/components/Columns/ListOfColumns'
import { useListOfTasksInColumnsQuery } from '../../taskList/hooks/useListOfTasksInColumnsQuery'

export function ListView({
	children,
	className = '',
}: {
	children: () => ColumnsContent
	className?: string
}) {
	const { listOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const columns = listOfTaskInColumns.map((list) => ({
		name: list.status,
		id: list.id,
	}))
	const colorTheme = useTheme()

	return (
		<div className='min-h-screen w-full flex items-center justify-center'>
			<div
				className={`w-full max-w-3xl mx-auto flex flex-col justify-stretch items-stretch rounded-lg ${colorTheme.column} ${className}`}
			>
				<ListOfColumn columns={columns}>{children}</ListOfColumn>
			</div>
		</div>
	)
}
