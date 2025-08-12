import React from 'react'
import { TaskList as taskList } from '@/modules/taskList/models/taskList'
import { BlankTask } from '../../../../sharedByModules/components/BlankTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/molecules/card'
import { TaskInArchiveActions } from './TaskInArchiveActions'
import { useTheme } from "@/App"

interface TaskListArchivedProps {
	taskList: taskList
	date: string
}

export function TaskListArchived({ taskList, date }: TaskListArchivedProps) {
	const { column } = useTheme()
	return (
		<>
			<Card key={date} className={`md:px-11 px-6 rounded-lg ${column}`}>
				<CardHeader>
					<CardTitle className='text-2xl'>{date}</CardTitle>
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
