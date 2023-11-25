import { columnModel } from '../models/column'
import './Board.css'

interface BoardProps {
    columns: columnModel[]
}

function Board({ columns }: BoardProps) {

  return (
    <ul className='board'>
        {
            columns.map(column => 
                <li key={column.id}>{column.title}</li>
            )
        }
    </ul>
  )
}

export default Board
