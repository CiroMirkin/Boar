import React from 'react'
import { TaskList as taskList } from '@/modules/TaskBoard/model/TaskList'
import { BlankTask } from '@/ui/organisms/BlankTask'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/molecules/card'
import { useTheme } from '@/common/hooks/useTheme'
import { MinimalTiptapViewer } from '@/ui/organisms/MinimalTiptapViewer'
import { ReturnTaskToBoardButton } from './ReturnTaskToBoardButton'
import { DeleteArchivedTaskButton } from './DeleteArchivedTaskButton'
import TaskTimeline from './TaskTimeline'

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
				{task.notesAndComments && (
					<div>
						<MinimalTiptapViewer
							value={task.notesAndComments ? task.notesAndComments : ''}
						/>
					</div>
				)}
				{task.timelineHistory && <TaskTimeline timelineHistory={task.timelineHistory} />}
				<>
					<ReturnTaskToBoardButton />
					<DeleteArchivedTaskButton />
				</>
			</BlankTask.ContentCollapse>
		</BlankTask>
	))
	return <>{tasks}</>
}
