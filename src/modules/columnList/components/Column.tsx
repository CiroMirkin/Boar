import React, { createContext, useContext } from 'react'
import { Column as columnModel, columnNull } from '../models/column'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { useCheckIfThisColumnIsTheFirst } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheFirst'
import { useCheckIfThisColumnIsTheLast } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheLast'
import { AddNewTaskInput } from './AddNewTaskInput'
import { ArchiveTaskListButton } from './ArchiveTaskListButton'
import { useColorTheme } from '@/modules/board/hooks/useColorTheme'

const ColumnContext = createContext(columnNull)

interface ColumnProps {
	data: columnModel
	children: React.ReactNode
}

export function Column({ data, children }: ColumnProps) {
	const colorTheme = useColorTheme()
	const columnClassName = `h-auto min-w-48 flex-1 flex flex-col justify-between rounded-lg ${colorTheme.column}`
	return (
		<ColumnContext.Provider value={data}>
			<Card className={columnClassName} >
				<CardHeader>
					<CardTitle>{data.name}</CardTitle>
				</CardHeader>

				{children}
			</Card>
		</ColumnContext.Provider>
	)
}

function ColumnContent({ children, className }: { children: React.ReactNode; className?: string }) {
	return <CardContent className={className ? className : ''}>{children}</CardContent>
}
Column.ColumnContent = ColumnContent

function ColumnFooter() {
	const data = useContext(ColumnContext)

	return (
		<CardFooter className='min-h-16'>
			{useCheckIfThisColumnIsTheFirst(data) && <AddNewTaskInput />}
			{useCheckIfThisColumnIsTheLast(data) && <ArchiveTaskListButton />}
		</CardFooter>
	)
}
Column.Footer = ColumnFooter
