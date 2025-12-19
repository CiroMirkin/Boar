import { BlankTask } from '@/ui/organisms/BlankTask'
import { taskModel } from '@/modules/TaskBoard/model/task'
import { TaskInBoardActions } from './TaskInBoardActions'
import { DragEvent } from 'react'

export function Task({ task }: { task: taskModel }) {
	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('task', JSON.stringify(task))
	}

	return (
		<div className='p-0 m-0' draggable onDragStart={handleDragStart}>
			<BlankTask data={task} key={task.id}>
				<BlankTask.ContentCollapse>
					<TaskInBoardActions />
				</BlankTask.ContentCollapse>
			</BlankTask>
		</div>
	)
}
