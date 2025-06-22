import React, { createContext, DragEvent, useContext, useState } from 'react'
import { Column as columnModel, columnNull } from '../models/column'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { useCheckIfThisColumnIsTheFirst } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheFirst'
import { useCheckIfThisColumnIsTheLast } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheLast'

import { useTheme } from '@/sharedByModules/Theme/ThemeContext'
import { ColumnsContext } from '../ColumnsContext'
import { taskModel } from '@/modules/taskList/models/task'

const ColumnContext = createContext(columnNull)

interface ColumnProps {
	data: columnModel
	children: React.ReactNode
}

export function Column({ data, children }: ColumnProps) {
	const colorTheme = useTheme()
	const [ dragOver, setDragOver] = useState(false)
	const columnClassName = `h-auto min-w-48 flex-1 flex flex-col justify-between rounded-lg ${colorTheme.column} ${dragOver && colorTheme.task}`
	
	const handleDrop = (e: DragEvent) => {
		setDragOver(false)
		const dropData = e.dataTransfer.getData('task')
		if(dropData != null) {
			const taskDragged: taskModel = JSON.parse(dropData)
			console.log(taskDragged)
		}
	}

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setDragOver(true)
	}

	return (
		<div 
			className="p-0 m-0" 
			onDragOver={handleDragOver}
			onDragLeave={() => { setDragOver(false) }}
			onDrop={handleDrop}
		>
			<ColumnContext.Provider value={data}>
				<Card className={columnClassName}>
					<CardHeader>
						<CardTitle>{data.name}</CardTitle>
					</CardHeader>
					{children}
				</Card>
			</ColumnContext.Provider>
		</div>
	)
}

function ColumnContent({ children, className }: { children: React.ReactNode; className?: string }) {
	return <CardContent className={className ? className : ''}>{children}</CardContent>
}
Column.ColumnContent = ColumnContent

function ColumnFooter() {
	const data = useContext(ColumnContext)
	const { firstColumnFooterContent, lastColumnFooterContent } = useContext(ColumnsContext)
	return (
		<CardFooter className='min-h-16'>
			{useCheckIfThisColumnIsTheFirst(data) && firstColumnFooterContent }
			{useCheckIfThisColumnIsTheLast(data) && lastColumnFooterContent }
		</CardFooter>
	)
}
Column.Footer = ColumnFooter
