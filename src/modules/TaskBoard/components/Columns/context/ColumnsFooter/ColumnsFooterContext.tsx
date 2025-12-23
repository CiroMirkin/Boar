import { createContext } from 'react'
import { ColumnsFooterContent } from './columnsFooterContent'

const defaultContextValue: ColumnsFooterContent = {
	firstColumnFooterContent: '',
	lastColumnFooterContent: '',
}

export const ColumnsFooterContext = createContext(defaultContextValue)
