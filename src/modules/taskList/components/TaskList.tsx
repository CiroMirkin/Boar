import React from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { Task } from './Task'

interface TaskListProps {
	tasks: taskList
}

export function TaskList({ tasks }: TaskListProps) {
	const taskList: React.ReactNode[] = []

	tasks.forEach((task) => {
		taskList.push(
			<Task task={task} />
		)
	})

	return (
		<>
			<div className='taskList flex flex-col gap-y-2'>{taskList}</div>
		</>
	)
}
