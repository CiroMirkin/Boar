import React from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { TaskInBoardActions } from './TaskInBoardActions'
import { BlankTask } from '../../sharedByModules/components/BlankTask'

interface TaskListProps {
	tasks: taskList
}

export function TaskList({ tasks }: TaskListProps) {
	const taskList: React.ReactNode[] = []

	tasks.forEach((task) => {
		taskList.push(
			<BlankTask data={task} key={task.id}>
				<BlankTask.ContentCollapse>
					<TaskInBoardActions />
				</BlankTask.ContentCollapse>
			</BlankTask>
		)
	})

	return (
		<>
			<div className='taskList flex flex-col gap-y-2'>{taskList}</div>
		</>
	)
}
