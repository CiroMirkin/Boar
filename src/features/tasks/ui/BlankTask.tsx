'use client'

import React, { createContext, useState } from 'react'
import { taskModel, emptyTask } from '../model/task'
import { Card, CardContent, CardFooter } from '@/shared/ui/molecules/card'
import { TextWithURL } from '@/shared/ui/atoms/TextWithURL'
import { useTheme } from '@/shared/hooks/useTheme'
import { Badge } from '@/shared/ui/atoms/badge'
import { useAvailableTags } from '@/features/tags'
import { CollapseTransition } from '@/shared/ui/atoms/CollapseTransition'

export const TaskContext = createContext(emptyTask)

interface BlankTaskProps {
	data: taskModel
	children?: React.ReactNode
}

export function BlankTask({ data, children }: BlankTaskProps) {
	const [show, setShow] = useState(false)
	const description = data.descriptionText
	const colorTheme = useTheme()
	const availableTags = useAvailableTags()

	const taskTags = availableTags
		.flatMap((group) => group.tags)
		.filter((tag) => data.tags && data.tags.find((taskTag) => taskTag.id === tag.id))

	const taskClassName = `p-0 rounded-md border-none text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-200 ${colorTheme.task}`

	return (
		<TaskContext.Provider value={data}>
			<Card className={taskClassName}>
				<CardContent
					onClick={() => setShow(!show)}
					className='rounded-md px-3 py-2 text-xl leading-tight font-semibold cursor-pointer'
				>
					<p className={`whitespace-pre-wrap ${colorTheme.taskText}`}>
						<TextWithURL text={description}></TextWithURL>
					</p>
					{taskTags && taskTags.length !== 0 && (
						<footer className='w-full pt-2 flex gap-1.5 flex-wrap opacity-80 hover:opacity-100 transition-opacity duration-200'>
							{taskTags.map((tag) => (
								<Badge
									variant={tag.variant ? tag.variant : 'inverted'}
									key={tag.id}
								>
									{tag.name}
								</Badge>
							))}
						</footer>
					)}
				</CardContent>
				<CollapseTransition isOpen={show} duration={300}>
					{children}
				</CollapseTransition>
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
