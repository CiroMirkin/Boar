import { columnModel } from '../models/column'
import './Column.css'
import Task from './Task'

interface ColumnProps extends columnModel {};

function Column({ name, id, taskList }: ColumnProps) {

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
    </li>
  )
}

export default Column