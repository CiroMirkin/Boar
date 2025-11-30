import React, { createContext, DragEvent, useContext, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/molecules/card'
import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { ColumnsFooterContext } from '../context/ColumnsFooter/ColumnsFooterContext'
import { ColumnPosition } from '../model/columnPosition'

const ColumnContext = createContext('' as ColumnPosition)

interface ColumnProps {
	columnPosition: ColumnPosition
	columnName: string
	children: React.ReactNode
}

export function Column({ columnName, columnPosition, children }: ColumnProps) {
	const colorTheme = useTheme()
	const [dragOver, setDragOver] = useState(false)
	const columnClassName = `h-auto w-auto px-0 flex flex-col justify-between rounded-lg ${colorTheme.column} border-none ${dragOver && colorTheme.task}`

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setDragOver(true)
	}

	return (
		<div
			className='p-0 m-0 h-auto min-w-48 flex-1'
			onDragOver={handleDragOver}
			onDragLeave={() => {
				setDragOver(false)
			}}
			onDrop={() => setDragOver(false)}
		>
			<ColumnContext.Provider value={columnPosition}>
				<Card className={columnClassName} aria-label={columnName}>
					<CardHeader className='pb-0 px-4'>
						<CardTitle className={`opacity-[.70] ${colorTheme.text}`}>
							{columnName}
						</CardTitle>
					</CardHeader>
					{children}
				</Card>
			</ColumnContext.Provider>
		</div>
	)
}

interface ColumnContentProps {
	children: React.ReactNode
	className?: string
}

function ColumnContent({ children, className }: ColumnContentProps) {
	return <CardContent className={className ? className : ''}>{children}</CardContent>
}
Column.ColumnContent = ColumnContent

function ColumnFooter() {
	const columnPosition = useContext(ColumnContext)
	const { firstColumnFooterContent, lastColumnFooterContent } = useContext(ColumnsFooterContext)

	return (
		<CardFooter className='min-h-16'>
			{columnPosition === 'FIRST' && firstColumnFooterContent}
			{columnPosition === 'LAST' && lastColumnFooterContent}
		</CardFooter>
	)
}
Column.Footer = ColumnFooter
