import React from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { BlankTask } from '../../../../sharedByModules/components/BlankTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { TaskInArchiveActions } from './TaskInArchiveActions'
import { useTheme } from '@/sharedByModules/Theme/ThemeContext'

interface TaskListArchivedProps {
	taskList: taskList
	date: string
}

export function TaskListArchived({ taskList, date }: TaskListArchivedProps) {
	const { column } = useTheme()
	return (
		<>
			<Card key={date} className={`px-4 rounded-lg ${column}`}>
				<CardHeader>
					<CardTitle>{date}</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-y-2'>
					<TaskList taskList={taskList} />
				</CardContent>
			</Card>
		</>
	)
}

function TaskList({ taskList }: { taskList: taskList }) {
	const tasks: React.ReactNode[] = taskList.map((task) => (
		<BlankTask data={task} key={task.id}>
			<BlankTask.ContentCollapse>
				<TaskInArchiveActions />
			</BlankTask.ContentCollapse>
		</BlankTask>
	))
	return <>{tasks}</>
}
