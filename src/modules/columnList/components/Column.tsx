import React, { createContext, DragEvent, useContext, useState } from 'react'
import { Column as columnModel, columnNull } from '../models/column'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { useCheckIfThisColumnIsTheFirst } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheFirst'
import { useCheckIfThisColumnIsTheLast } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheLast'

import { useTheme } from '@/sharedByModules/Theme/ThemeContext'
import { ColumnsContext } from '../ColumnsContext'

const ColumnContext = createContext(columnNull)

interface ColumnProps {
	data: columnModel
	children: React.ReactNode
}

export function Column({ data, children }: ColumnProps) {
	const colorTheme = useTheme()
	const [ dragOver, setDragOver] = useState(false)
	const columnClassName = `h-auto w-auto px-0 flex flex-col justify-between rounded-lg ${colorTheme.column} border-none ${dragOver && colorTheme.task}`

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setDragOver(true)
	}

	return (
		<div 
			className="p-0 m-0 h-auto min-w-48 flex-1" 
			onDragOver={handleDragOver}
			onDragLeave={() => { setDragOver(false) }}
			onDrop={() => setDragOver(false)}
		>
			<ColumnContext.Provider value={data}>
				<Card className={columnClassName}>
					<CardHeader className='pb-0 px-4'>
						<CardTitle className='opacity-[.70]'>{data.name}</CardTitle>
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
