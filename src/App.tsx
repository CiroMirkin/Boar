import './App.css'
import { Board } from './components/Board'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { archive } from './models/archive'
import { Header } from './components/Header'
import { Toaster } from './components/ui/toaster'



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
      <Header title={boardData.name} />

        <Board data={boardData} taskListInEachColumn={taskListInEachColumn} columnList={columnList} />

      <Toaster/>
    </>
  )
}

export default App
