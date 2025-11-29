import { createContext } from 'react'

export interface ColumnsContextContent {
	firstColumnFooterContent: React.ReactNode
	lastColumnFooterContent: React.ReactNode
}

const defaultColumnsContextValue: ColumnsContextContent = {
	firstColumnFooterContent: '',
	lastColumnFooterContent: '',
}

export const ColumnsContext = createContext(defaultColumnsContextValue)

interface ColumnsProviderProps {
	children: React.ReactNode
	value: ColumnsContextContent
}

export const ColumnsProvider = ({ children, value }: ColumnsProviderProps) => {
	return <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
}
