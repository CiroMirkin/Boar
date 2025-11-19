import { format } from '@formkit/tempo'
import { TaskTimelineHistory } from '../../models/taskTimelineHistory'
import { useTheme } from '@/sharedByModules/hooks/useTheme'

interface TaskTimelineProps {
	timelineHistory: TaskTimelineHistory
}

export default function TaskTimeline({ timelineHistory }: TaskTimelineProps) {
	const timeLine = timelineHistory.map((timeHistory, index) => {
		const date = format(timeHistory.date, 'DD/MM/YY, HH:mm')
		const key = `${timeHistory.date}`

		return (
			<li key={key} className='flex'>
				<div className='flex flex-col items-center mr-2'>
					<div className='w-2 h-2 bg-black rounded-full relative z-10 mt-1'></div>
					{index < timelineHistory.length - 1 && (
						<div className='w-0.5 flex-1 bg-black mt-1'></div>
					)}
				</div>

				<div className={`text-sm ${index < timelineHistory.length - 1 ? 'pb-4' : ''}`}>
					<span className='font-semibold'>{timeHistory.columnName}</span> - {date}
				</div>
			</li>
		)
	})
	const { column } = useTheme()
	return <ul className={`w-full py-2 px-3 rounded-md ${column}`}>{timeLine}</ul>
}
