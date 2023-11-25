import { columnModel } from '../models/column'
import './Board.css'
import Column from './Column'

interface BoardProps {
    columns: columnModel[]
}

function Board({ columns }: BoardProps) {

  return (
    <ul className='board'>
        {
            columns.map(column => 
                <Column 
                key={column.id} 
                name={column.name} 
                id={column.id} 
                taskList={column.taskList} 
                />
            )
        }
    </ul>
  )
}

export default Board
