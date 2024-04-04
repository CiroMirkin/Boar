import './App.css'
import { Board } from './pages/board/Board'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { archive } from './model/archive'
import { Toaster } from './ui/toaster'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Archive } from './pages/archive/Archive'
import { ConfigBoard } from './pages/configs/ConfigBoard'
import { Erro404 } from './pages/404/404'
import { useEffect } from 'react'
import { TaskListInEachColumnRepository } from './model/taskListRepository'
import { ColumnListRepository } from './model/columnListRepository'


const getArchive = (): archive => {
  const archive = useSelector((state: RootState) => state.archive.list)
  const reverseArchive = [];
  for (let i = archive.length -1; i >= 0; i--) {
    reverseArchive.push(archive[i]);
  }
  return reverseArchive
}
const getColumnList = () => {
  return useSelector((state: RootState) => state.columnList.list)
}
const getTaskListInEachColumn = () => {
  return useSelector((state: RootState) => state.taskListInEachColumn.list)
}

interface AppProps {
  taskListInEachColumnRepository: TaskListInEachColumnRepository
  columnListRepository: ColumnListRepository
}

function App({ taskListInEachColumnRepository, columnListRepository }: AppProps) {
  const columnList = getColumnList()
  const taskListInEachColumn = getTaskListInEachColumn()
  const archive = getArchive()
  const boardData = { id: '1', name: 'Tablero básico' }

  useEffect(() => {
    taskListInEachColumnRepository.save(taskListInEachColumn)
  }, [taskListInEachColumn])

  useEffect(() => columnListRepository.save(columnList), [columnList])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' 
            element={
              <Board data={boardData} taskListInEachColumn={taskListInEachColumn} columnList={columnList} />
            }
          />
          <Route path='/archive' 
            element={
              <Archive boardArchive={archive} />
            }
          />
          <Route path='/settings' 
            element={
              <ConfigBoard boardData={boardData} columnList={columnList} />
            }
          />
          <Route path='*' element={ <Erro404 /> } />
        </Routes>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
