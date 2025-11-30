import React, { DragEvent } from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { Task } from './Task'
import { taskModel } from '../models/task'
import { moveThisTaskToThisColumn } from '../useCase/moveThisTaskToThisColumn'
import { useListOfTasksInColumnsQuery } from '../hooks/useListOfTasksInColumnsQuery'
import { sortListOfTasksInColumnsByPriority } from '../models/sortListOfTasksInColumnsByPriority'
import { addChangeToTaskTimelineHistory } from '../useCase/addChangeToTaskTimelineHistory'
import { useGetColumnNameFromPosition } from '@/modules/taskList/components/Columns/hooks/useGetColumnNameFromPosition'
import { useTaskListInEachColumn } from '../hooks/useTaskListInEachColumn'

interface TaskListProps {
	tasks: taskList
	columnPosition: string
}

export function TaskList({ tasks, columnPosition }: TaskListProps) {
	const taskList: React.ReactNode[] = []

	tasks.forEach((task) => {
		taskList.push(<Task task={task} key={task.id} />)
	})

	const { updateListOfTaskInColumns } = useListOfTasksInColumnsQuery()
	const listOfTaskInColumns = useTaskListInEachColumn()
	const getColumnName = useGetColumnNameFromPosition()
	const handleDrop = (e: DragEvent) => {
		const dropData = e.dataTransfer.getData('task')
		if (dropData != null) {
			const taskDragged: taskModel = JSON.parse(dropData)
			const task: taskModel = {
				...taskDragged,
				timelineHistory: addChangeToTaskTimelineHistory({
					task: taskDragged,
					columnName: getColumnName(columnPosition),
				}),
			}

			const updatedList = sortListOfTasksInColumnsByPriority(
				moveThisTaskToThisColumn({
					taskListOfColumns: listOfTaskInColumns,
					task,
					newColumnPosition: columnPosition,
				})
			)
			updateListOfTaskInColumns(updatedList)
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
