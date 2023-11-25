import './App.css'
import Board from './components/Board'
import { columnModel } from './models/column'

function App() {
  const columns: columnModel[] = [
    {
      title: "Pendintes",
      id: "1",
      taskList: []
    },
    {
      title: "Procesando",
      id: "2",
      taskList: []
    },
    {
      title: "Terminado",
      id: "3",
      taskList: []
    },
  ]

  return (
    <>
    <Board columns={columns}></Board>
    </>
  )
}

export default App
