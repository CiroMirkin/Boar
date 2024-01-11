import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import toast from 'react-hot-toast'
import BoardHeader from './BoardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { changeColumnName, deleteColumn } from '../redux/columnsSlice'
import { BoardFooter } from './BoardFooter'

interface BoardProps {
  name: string,
  changeName: Function
}

function Board({ name, changeName }: BoardProps) {
  const columns = useSelector((state: RootState) => state.columns.columns)

  return (
    <>
      <BoardHeader name={name} changeName={changeName} />

      <ul className='board'>
          {
              columns.map((column, index) => 
                  <Column 
                    key={column.id} 
                    id={column.id} 
                    name={column.name} 
                    firstColumn={index == 0}
                  > 
                    <TaskList taskList={column.taskList} />
                  </Column>
              )
          }
      </ul>

      <BoardFooter />
    </>
  )
}

export default Board
