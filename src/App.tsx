import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { defaultColumnList } from './models/column'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { archive } from './models/archive'
import { Header } from './components/Header'

export const ColumnListContext = React.createContext(defaultColumnList)

const getArchive = (): archive => {
  return useSelector((state: RootState) => state.archive).reverse()
}
const getColumnList = () => {
  return useSelector((state: RootState) => state.columnList)
}
const getTaskListInEachColumn = () => {
  return useSelector((state: RootState) => state.taskListInEachColumn.list)
}

function App() {
  const columnList = getColumnList()
  const taskListInEachColumn = getTaskListInEachColumn()
  const boardData = { id: '1', name: 'Tablero básico' }
  return (
    <>
    <Header title={boardData.name} />
    <ColumnListContext.Provider value={columnList}>
      <Board data={boardData} taskListInEachColumn={taskListInEachColumn} />
    </ColumnListContext.Provider>
    </>
  )
}

export default App
