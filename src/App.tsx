import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { defaultColumnList } from './models/column'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { taskList } from './models/task'
import { archive } from './models/archive'

export const ColumnListContext = React.createContext(defaultColumnList)
export const TaskListInEachColumnContext = React.createContext([[], [], []] as taskList[])

const getArchive = (): archive => {
  return useSelector((state: RootState) => state.archive).reverse()
}

function App() {
  const columnList = useSelector((state: RootState) => state.columnList)
  const taskListInEachColumn = useSelector((state: RootState) => state.taskListInEachColumn.list)
  return (
    <>
    <ColumnListContext.Provider value={columnList}>
      <TaskListInEachColumnContext.Provider value={taskListInEachColumn}>
      <Board />
      </TaskListInEachColumnContext.Provider>
    </ColumnListContext.Provider>
    </>
  )
}

export default App
