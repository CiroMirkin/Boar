import React from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { TaskInBoardActions } from './TaskInBoardActions'
import { Task } from '../../sharedByModules/components/Task'

interface TaskListProps {
	tasks: taskList
}

export function TaskList({ tasks }: TaskListProps) {
	const taskList: React.ReactNode[] = []

	tasks.forEach((task) => {
		taskList.push(
			<Task data={task} key={task.id}>
				<Task.ContentCollapse>
					<TaskInBoardActions />
				</Task.ContentCollapse>
			</Task>
		)
	})

	return (
		<>
			<div className='taskList flex flex-col gap-y-2'>{taskList}</div>
		</>
	)
}
