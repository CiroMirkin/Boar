import { columnModel } from '../models/column'

interface ColumnProps extends columnModel {};

function Column({ name, id, taskList }: ColumnProps) {

  return (
    <li className='column' key={id}>
        <h2 className='column__title'>{name}</h2>
        <ul className="column__task-list">
            {
                taskList.map(task => 
                    <li key={task.id}>{task.descriptionText}</li>    
                )
            }
        </ul>
    </li>
  )
}

export default Column