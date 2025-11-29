import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { ListOfColumn, ColumnsContent } from './ListOfColumns'
import { emptyTaskBoard } from '../models/taskBoard'

export function ListView({
	children,
	className = '',
}: {
	children: () => ColumnsContent
	className?: string
}) {
	const listOfTaskInColumns = emptyTaskBoard
	const columns: string[] = listOfTaskInColumns.map((list) => list.status)
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
