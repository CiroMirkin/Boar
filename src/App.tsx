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
import { ColumnListRepository } from './models/columnListRepository'
import { ArchiveRepository } from './models/archiveRepository'


const getArchive = (): ArchiveModel => {
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
  archiveRepository: ArchiveRepository
}

function App({ taskListInEachColumnRepository, columnListRepository, archiveRepository }: AppProps) {
  const columnList = getColumnList()
  const taskListInEachColumn = getTaskListInEachColumn()
  const archive = getArchive()
  const boardData = { id: '1', name: 'Tablero básico' }

  useEffect(() => {
    taskListInEachColumnRepository.save(taskListInEachColumn)
  }, [taskListInEachColumn])

  useEffect(() => columnListRepository.save(columnList), [columnList])

  useEffect(() => archiveRepository.save(archive), [archive])

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
          <Route path='*' element={ <Erro404 /> } />
        </Routes>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
