import { useState } from 'react'
import './Column.css'
import ColumnName from './ColumnName'

interface ColumnProps {
  id: string,
  name: string,
  children: React.ReactNode,
  addNewTaskInColumn: Function,
  changeColumnName: Function,
  deleteColumn: Function
};

function Column({ name, id, children, addNewTaskInColumn, changeColumnName, deleteColumn }: ColumnProps) {
  const [ newTask, setNewTask ] = useState('')

  const pushNewTaskInColumn = () => {
    if(!!newTask.trim()) {
      addNewTaskInColumn({
        descriptionText: newTask,
        id: crypto.randomUUID()
      }, id)
      setNewTask('')
    }
  }

  const handleClick = () => pushNewTaskInColumn()

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter') {
      const target = e.target as HTMLInputElement;
      const newTaskText = (target.value).trim()
      setNewTask(newTaskText)
      pushNewTaskInColumn()
    }
  }

  return (
    <li className='column' key={id}>
        <ColumnName name={name} columnId={id} changeColumnName={changeColumnName} deleteColumn={deleteColumn} />
        {
          children
        }
        <footer className="column__footer">
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            onKeyUp={handleKeyUp}
            placeholder='Agregar una nueva tarea...'
          />
          <button onClick={handleClick}>Agregar</button>
        </footer>
    </li>
  )
}

export default Column