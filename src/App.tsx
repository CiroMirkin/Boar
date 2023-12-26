import './App.css'
import { useState } from 'react'
import Board from './components/Board'
import { Toaster } from 'react-hot-toast'

function App() {
  const [ columns, setColumns ] = useState([
    {
      name: "Pendientes",
      id: "1",
      taskList: [
        {
          descriptionText: "Hacer un cafe.",
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
  const [ boardName, setBoardName ] = useState("Tablero básico")

  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Board name={boardName} changeName={setBoardName} columns={columns} setColumns={setColumns} />
    </>
  )
}

export default App
