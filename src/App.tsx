import './App.css'
import { Board } from './components/board/Board'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { Archive as ArchiveModel } from './models/archive'
import { Toaster } from './ui/toaster'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Archive } from './components/archive/Archive'
import { Configs } from './components/configs/Configs'
import { Erro404 } from './components/404/404'
import { useEffect } from 'react'
import { TaskListInEachColumnRepository } from './models/taskListInEachColumnRepository'
import { Help } from './components/help/Help'
import { BoardRepository } from './models/boardRepository'


const getArchive = (): ArchiveModel => {
  return useSelector((state: RootState) => state.archive.list)
}
const getColumnList = () => {
  return useSelector((state: RootState) => state.columnList.list)
}
const getTaskListInEachColumn = () => {
  return useSelector((state: RootState) => state.taskListInEachColumn.list)
}

const getBoard = () => {
  return useSelector((state: RootState) => state.board)
}

interface AppProps {
  taskListInEachColumnRepository: TaskListInEachColumnRepository
  boardRepository: BoardRepository
}

function App({ taskListInEachColumnRepository, boardRepository }: AppProps) {
  const columnList = getColumnList()
  const taskListInEachColumn = getTaskListInEachColumn()
  const archive = getArchive()
  const boardData = getBoard()

  useEffect(() => boardRepository.save(boardData), [boardData])

  useEffect(() => {
    taskListInEachColumnRepository.save(taskListInEachColumn)
  }, [taskListInEachColumn])

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
              <Configs boardData={boardData} columnList={columnList} />
            }
          />
          <Route path='/help' 
            element={
              <Help />
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
