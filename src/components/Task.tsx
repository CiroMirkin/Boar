import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'

interface ColumnProps extends taskModel {
  deleteTask: Function
};

function Task({ descriptionText, id, deleteTask }: ColumnProps) {
  return (
    <li className='task'>
        <p className="task__text">{descriptionText}</p>
        <TaskOptions taskId={id} deleteTask={deleteTask}/>
    </li>    
  )
}

export default Task