import './App.css'
import { Board } from './components/board/Board'
import { Toaster } from './ui/toaster'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Archive } from './components/archive/Archive'
import { Configs } from './components/configs/Configs'
import { Erro404 } from './components/404/404'
import { useEffect } from 'react'
import { Help } from './components/help/Help'
import { BoardRepository } from './models/boardRepository'
import LocalStorageBoardRepository from './repositories/localstorageBoard.ts'
import { useColumnList } from './hooks/getColumnList.tsx'
import { useBoard } from './hooks/getBoardData.tsx'
import { useArchive } from './hooks/getArchive.tsx'
import { useTaskListInEachColumn } from './hooks/getTaskListInEachColumn.tsx'

const boardRepository: BoardRepository = new LocalStorageBoardRepository()

function App() {
  const columnList = useColumnList()
  const taskListInEachColumn = useTaskListInEachColumn()
  const archive = useArchive()
  const boardData = useBoard()

  useEffect(() => boardRepository.save(boardData), [boardData])

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
