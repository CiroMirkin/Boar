import './App.css'
import { useState } from 'react'
import Board from './components/Board'
import { taskModel } from './models/task'
import { addTaskToThisColumn } from './addTask'

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

  const addNewTaskInColumn = (newTask: taskModel, columnId: string) => {
    const newColumns = addTaskToThisColumn(columnId, columns, newTask)
    setColumns(newColumns)
  }

  return (
    <>
    <Board columns={columns} addNewTaskInColumn={addNewTaskInColumn}></Board>
    </>
  )
}

export default App
