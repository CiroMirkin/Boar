import { columnModel } from '../models/column'
import './Board.css'
import Column from './Column'

interface BoardProps {
    columns: columnModel[],
    addNewTaskInColumn: Function
}

function Board({ columns, addNewTaskInColumn }: BoardProps) {

  return (
    <ul className='board'>
        {
            columns.map(column => 
                <Column 
                key={column.id} 
                name={column.name} 
                id={column.id} 
                addNewTaskInColumn={addNewTaskInColumn}
                taskList={column.taskList} 
                />
            )
        }
    </ul>
  )
}

export default Board
