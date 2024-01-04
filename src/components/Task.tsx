import { taskModel } from '../models/task'
import './Task.css'
import TaskOptions from './TaskOptions'

interface ColumnProps extends taskModel {
  deleteTask: Function,
  moveTask: Function
};

function Task({ descriptionText, id, deleteTask, moveTask }: ColumnProps) {
  return (
    <li className='task'>
        <p className="task__text">{descriptionText}</p>
        <TaskOptions taskId={id} deleteTask={deleteTask} moveTask={moveTask} taskDescription={descriptionText} />
    </li>    
  )
}

export default Task