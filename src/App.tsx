import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { defaultColumnList } from './models/column'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

export const ColumnList = React.createContext(defaultColumnList)

function App() {
  const columnList = useSelector((state: RootState) => state.columnList)
  return (
    <>
    <ColumnList.Provider value={columnList}>
      <Board />
    </ColumnList.Provider>
    </>
  )
}

export default App
