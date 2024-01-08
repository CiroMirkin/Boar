import './App.css'
import { useState } from 'react'
import Board from './components/Board'
import { Toaster } from 'react-hot-toast'
import Joyride from "react-joyride";

const steps = [
  {
    content: 'Una aplicación para gestionar tareas.',
    disableBeacon: true,
    placement: 'center',
    target: 'body',
    title: 'Bienvenido a Boar',
  },
];

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
      <Joyride 
        steps={steps} 
        showProgress 
        showSkipButton 
        hideCloseButton
        disableScrolling
        continuous
        locale={{
          back: 'Volver', 
          close: 'Cerrar', 
          last: 'Anterior', 
          next: 'Siguiente', 
          skip: 'Saltar tutorial'
        }}
        styles={{
          options: {
            backgroundColor: "#f3f3f3",
            overlayColor: "rgb(0 0 0 / 46%)",
            textColor: "#000",
            primaryColor: "rgb(136,163,253)",
            width: "18rem",
            zIndex: 1
          },
        }}
      />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Board name={boardName} changeName={setBoardName} columns={columns} setColumns={setColumns} />
    </>
  )
}

export default App
