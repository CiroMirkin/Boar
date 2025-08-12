import React, { createContext, useState } from 'react'
import { taskModel, emptyTask } from '@/modules/taskList/models/task'
import { Card, CardContent, CardFooter } from '../molecules/card'
import { TextWithURL } from '@/ui/atoms/TextWithURL'
import { useTheme } from "@/App"

export const TaskContext = createContext(emptyTask)

interface BlankTaskProps {
	data: taskModel
	children?: React.ReactNode
}

export function BlankTask({ data, children }: BlankTaskProps) {
	const [show, setShow] = useState(false)
	const description = data.descriptionText
	const colorTheme = useTheme()
	const taskClassName = `p-0 rounded-md border-none text-card-foreground shadow-sm ${colorTheme.task}`

	return (
		<TaskContext.Provider value={data}>
			<Card className={taskClassName}>
				<CardContent
					onClick={() => setShow(!show)}
					className='rounded-md hover:bg-accent px-3 py-2 text-xl leading-6 font-semibold'
				>
					<p className={colorTheme.taskText}>
						<TextWithURL text={description}></TextWithURL>
					</p>
				</CardContent>
				{show && children}
			</Card>
		</TaskContext.Provider>
	)
}

function ContentCollapse({ children }: { children: React.ReactNode }) {
	return (
		<CardFooter className='flex flex-col justify-between gap-x-1 gap-y-1.5 items-start p-2 pt-1'>
			{children}
		</CardFooter>
	)
}

/** El children de ContentCollapse se muestra y oculta cuando el usuario hace click sobre el contenido del componente Task. */
BlankTask.ContentCollapse = ContentCollapse
