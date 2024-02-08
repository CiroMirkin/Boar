import './Board.css'
import Column from './Column'
import TaskList from './TaskList'
import BoardHeader from './BoardHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { BoardFooter } from './BoardFooter'
import { CONTAINER_BORDER_TYPES, Container } from './atomic/Container'


interface BoardProps {
  name: string,
  changeName: Function
}

function Board({ name, changeName }: BoardProps) {
  const columns = useSelector((state: RootState) => state.columns.columns)

  return (
    <>
      <BoardHeader name={name} changeName={changeName} />

      <Container customClassName='board' borderType={CONTAINER_BORDER_TYPES.NONE}>
        {
          columns.map((column, index) => 
            <Column 
              key={column.id} 
              id={column.id} 
              columnData={column}
              firstColumn={index == 0}
            > 
              <TaskList taskList={column.taskList} />
            </Column>
          )
        }
      </Container>

      <BoardFooter />
    </>
  )
}

export default Board
