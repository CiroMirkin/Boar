import { ColumnsFooterContent } from './columnsFooterContent'
import { ColumnsFooterContext } from './ColumnsFooterContext'

interface ProviderProps {
	children: React.ReactNode
	value: ColumnsFooterContent
}

export const ColumnsFooterContentProvider = ({ children, value }: ProviderProps) => {
	return <ColumnsFooterContext.Provider value={value}>{children}</ColumnsFooterContext.Provider>
}
