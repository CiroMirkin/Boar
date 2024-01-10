import { useState } from 'react'
import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'

interface ColumnProps extends taskModel {
  deleteTask: Function,
  moveTask: Function,
  editTask?: Function
};

function Task({ descriptionText, id, deleteTask, moveTask, editTask }: ColumnProps) {
  const [ showTaskOptions, setShowTaskOptions ] = useState(false)

  const handleClick = () => {
      const newShowTaskOptionsValue = !showTaskOptions
      setShowTaskOptions(newShowTaskOptionsValue)
  }
  return (
    <li className='task' onClick={handleClick}>
        <p className="task__text">{descriptionText}</p>
        <footer className='task-options'>
          <ul className={`task-options__options ${showTaskOptions ? 'task-options__options--show' : 'task-options__options--hide'}`}>
            <TaskOptions 
              taskId={id} 
              deleteTask={deleteTask} 
              moveTask={moveTask} 
              editTask={editTask} 
              taskDescription={descriptionText} 
            />
          </ul>
        </footer>
    </li>    
  )
}

export default Task