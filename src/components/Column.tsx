import { useState } from 'react'
import { columnModel } from '../models/column'
import './Column.css'
import Task from './Task'

interface ColumnProps extends columnModel {
  addNewTaskInColumn: Function
};

function Column({ name, id, taskList, addNewTaskInColumn }: ColumnProps) {
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
        <h2 className='column__title'>{name}</h2>
        <ul className="column__task-list">
            {
                taskList.map(task => 
                    <Task key={task.id} id={task.id} descriptionText={task.descriptionText} /> 
                )
            }
        </ul>
        <footer className="column__footer">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Agregar una nueva tarea...'/>
          <button onClick={handleClick}>Agregar</button>
        </footer>
    </li>
  )
}

export default Column