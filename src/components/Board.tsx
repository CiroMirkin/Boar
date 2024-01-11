import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import BoardHeader from './BoardHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
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
