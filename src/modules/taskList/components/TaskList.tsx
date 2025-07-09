import React, { DragEvent } from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { Task } from './Task'
import { taskModel } from '../models/task'
import { useDispatch } from 'react-redux'
import { moveThisTaskToThisColumnPosition } from '../state/taskListInEachColumnReducer'

interface TaskListProps {
	tasks: taskList
	columnPosition: string
}

export function TaskList({ tasks, columnPosition }: TaskListProps) {
	const taskList: React.ReactNode[] = []

	tasks.forEach((task) => {
		taskList.push(
			<Task task={task} key={task.id} />
		)
	})

	const dispatch = useDispatch()

	const handleDrop = (e: DragEvent) => {
		const dropData = e.dataTransfer.getData('task')
		if(dropData != null) {
			const taskDragged: taskModel = JSON.parse(dropData)
			dispatch(moveThisTaskToThisColumnPosition({
				task: taskDragged,
				newColumnPosition: columnPosition
			}))
		}
	}

	return (
		<>
			<div 
				className='taskList min-h-64 md:min-h-[60vh] pt-4 px-4 flex flex-col gap-y-2'
				onDrop={handleDrop}
			>
					{taskList}
			</div>
		</>
	)
}
