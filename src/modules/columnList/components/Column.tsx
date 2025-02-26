import React, { createContext, useContext } from 'react'
import { Column as columnModel, columnNull } from '../models/column'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { useCheckIfThisColumnIsTheFirst } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheFirst'
import { useCheckIfThisColumnIsTheLast } from '@/modules/columnList/hooks/useCheckIfThisColumnIsTheLast'

import { ThemeContext } from '@/shared/Theme/ThemeContext'
import { ColumnsContext } from '../ColumnsContext'

const ColumnContext = createContext(columnNull)

interface ColumnProps {
	data: columnModel
	children: React.ReactNode
}

export function Column({ data, children }: ColumnProps) {
	const { theme: colorTheme } = useContext(ThemeContext)
	const columnClassName = `h-auto min-w-48 flex-1 flex flex-col justify-between rounded-lg ${colorTheme.column}`
	return (
		<ColumnContext.Provider value={data}>
			<Card className={columnClassName}>
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
	const { firstColumnFooterContent, lastColumnFooterContent } = useContext(ColumnsContext)
	return (
		<CardFooter className='min-h-16'>
			{useCheckIfThisColumnIsTheFirst(data) && firstColumnFooterContent }
			{useCheckIfThisColumnIsTheLast(data) && lastColumnFooterContent }
		</CardFooter>
	)
}
Column.Footer = ColumnFooter
