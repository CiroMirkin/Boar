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
  {
    content: 'Así son las tareas.',
    disableBeacon: true,
    target: ".task",
    showSkipButton: false,
    title: 'Boar',
  },
  {
    content: 'Con este botón puedes ver las opciones de una tarea.',
    disableBeacon: true,
    target: ".task-options",
    showSkipButton: false,
    title: 'Boar',
  },
  {
    content: 'Las columnas representan el estado de las tareas.',
    disableBeacon: true,
    target: ".column--first-column",
    showSkipButton: false,
    title: 'Boar',
  },
  {
    content: 'Al lado del nombre de una columna están las opciones editar y eliminar.',
    disableBeacon: true,
    target: ".column-header",
    showSkipButton: false,
    title: 'Boar',
  },
  {
    content: 'Aquí puedes escribir y crear tus tareas.',
    disableBeacon: true,
    target: ".column__footer",
    showSkipButton: false,
    locale: {
      last: 'Terminar tutorial', 
    },
    title: 'Boar',
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
