import './App.css'
import { useState } from 'react'
import Board from './components/Board'

function App() {
  const [ columns, setColumns ] = useState([
    {
      name: "Pendintes",
      id: "1",
      taskList: [
        {
          descriptionText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quisquam.",
          id: "1"
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
  ])

  return (
    <>
      <Board columns={columns} setColumns={setColumns} />
    </>
  )
}

export default App
