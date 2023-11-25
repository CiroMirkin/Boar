import './App.css'
import Board from './components/Board'
import { columnModel } from './models/column'

function App() {
  const columns: columnModel[] = [
    {
      name: "Pendintes",
      id: "1",
      taskList: [
        {
          descriptionText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quisquam.",
          id: "1"
        },
        {
          descriptionText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores ad sint repellendus nemo consequatur velit aut.",
          id: "2"
        },
      ]
    },
    {
      name: "Procesando",
      id: "2",
      taskList: []
    },
    {
      name: "Terminado",
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
