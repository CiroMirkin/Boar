import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { defaultColumnList } from './models/column'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

export const ColumnListContext = React.createContext(defaultColumnList)

function App() {
  const columnList = useSelector((state: RootState) => state.columnList)
  return (
    <>
    <ColumnListContext.Provider value={columnList}>
      <Board />
    </ColumnListContext.Provider>
    </>
  )
}

export default App
