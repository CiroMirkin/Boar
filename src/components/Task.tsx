import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'

interface ColumnProps extends taskModel {};

function Task({ descriptionText, id }: ColumnProps) {
  return (
    <li className='task'>
        <p className="task__text">{descriptionText}</p>
        <TaskOptions taskId={id}/>
    </li>    
  )
}

export default Task