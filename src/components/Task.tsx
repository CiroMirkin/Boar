import { taskModel } from '../models/task'

interface ColumnProps extends taskModel {};

function Task({ descriptionText, id }: ColumnProps) {
  return (
    <li className='task'>
        <p className="task__text">{descriptionText}</p>
    </li>    
  )
}

export default Task