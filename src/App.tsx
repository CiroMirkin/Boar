import './App.css'
import { Board } from './components/Board'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { archive } from './models/archive'
import { Header } from './components/Header'
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Archive } from './components/Archive'
import { ConfigBoard } from './components/ConfigBoard'


const getArchive = (): archive => {
  return useSelector((state: RootState) => state.archive).reverse()
}
const getColumnList = () => {
  return useSelector((state: RootState) => state.columnList.list)
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
    <Router>
      <Header title={boardData.name} />

      <Routes>
        <Route path='/' 
          element={
            <Board data={boardData} taskListInEachColumn={taskListInEachColumn} columnList={columnList} />
          }
        />
        <Route path='/archive' 
          element={
            <Archive boardArchive={getArchive()} />
          }
        />
        <Route path='/settings' 
          element={
            <ConfigBoard boardData={boardData} columnList={columnList} />
          }
        />
      </Routes>
    </Router>


      <Toaster/>
    </>
  )
}

export default App
