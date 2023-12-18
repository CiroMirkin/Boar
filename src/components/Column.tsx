import { useState } from 'react'
import './Column.css'
import ColumnName from './ColumnName'

interface ColumnProps {
  id: string,
  name: string,
  children: React.ReactNode,
  addNewTaskInColumn: Function,
};

function Column({ name, id, children, addNewTaskInColumn }: ColumnProps) {
  const [ newTask, setNewTask ] = useState('')

  const handleClick = () => {
    if(!!newTask.trim()) {
      addNewTaskInColumn({
        descriptionText: newTask,
        id: crypto.randomUUID()
      }, id)
      setNewTask('')
    }
  }

  return (
    <li className='column' key={id}>
        <ColumnName name={name} />
        {
          children
        }
        <footer className="column__footer">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Agregar una nueva tarea...'/>
          <button onClick={handleClick}>Agregar</button>
        </footer>
    </li>
  )
}

export default Column